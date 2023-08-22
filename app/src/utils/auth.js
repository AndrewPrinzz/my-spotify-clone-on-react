import React from 'react'

import axios from "axios"
import { useQueryClient } from 'react-query'
import { useLocalStorageState } from 'utils/hooks'

const code = new URLSearchParams(window.location.search).get('code')

const LOCALSTORAGE_KEYS = {
  accessToken: '__auth_provider_access_token__',
  refreshToken: '__auth_provider_refresh_token__',
  expiresIn: '__auth_provider_expire_time__',
  timeStamp: '__auth_provider_token_timestamp__',
}

function useAuthDataForContext() {
  const [accessToken, setAccessToken] = React.useState()
  const [localStorageAccessToken, setLocalStorageAccessToken] = useLocalStorageState(LOCALSTORAGE_KEYS.accessToken)
  const [refreshToken, setRefreshToken] = React.useState()
  const [localStorageRefreshToken, setLocalStorageRefreshToken] = useLocalStorageState(LOCALSTORAGE_KEYS.refreshToken)
  const [expiresIn, setExpiresIn] = React.useState()
  const [localStorageExpiresIn, setlocalStorageExpiresIn] = useLocalStorageState(LOCALSTORAGE_KEYS.expiresIn)
  const [timeStamp, setTimestamp] = React.useState()
  const [localStorageTimeStamp, setLocalStorageTimeStamp] = useLocalStorageState(LOCALSTORAGE_KEYS.timeStamp)

  const queryClient = useQueryClient()

  function clearAuthData(spotifyApi) {
    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, '')
    window.localStorage.setItem(LOCALSTORAGE_KEYS.refreshToken, '')
    window.localStorage.setItem(LOCALSTORAGE_KEYS.expiresIn, '')
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timeStamp, '')
    spotifyApi.setAccessToken('')
    spotifyApi.setRefreshToken('')
    queryClient.clear()
  }

  const setAuthDataFromLocalStorage = () => {
    setRefreshToken(localStorageRefreshToken)
    setExpiresIn(localStorageExpiresIn)
    setTimestamp(localStorageTimeStamp)
    setAccessToken(localStorageAccessToken)
  }

  const setAuthData = (res) => {
    // if we don't have res.data then we set value from local storage
    setAccessToken(res?.data?.accessToken)
    setLocalStorageAccessToken(res?.data?.accessToken)

    if (res.data.refreshToken) {
      setRefreshToken(res?.data?.refreshToken)
      setLocalStorageRefreshToken(res?.data?.refreshToken)
    }

    setExpiresIn(res?.data?.expiresIn)
    setlocalStorageExpiresIn(res?.data?.expiresIn)

    // if we just set this value then we should add it to local storage
    setTimestamp(Date.now())
    setLocalStorageTimeStamp(Date.now())
  }

  const accessTokenIsActual = ((Date.now() - Number(localStorageTimeStamp)) / 1000) < Number(localStorageExpiresIn)

  const accessTokenHasntExpired = accessTokenIsActual && localStorageExpiresIn && localStorageRefreshToken ? true : false

  return {
    setAuthData,
    clearAuthData,
    accessToken,
    refreshToken,
    expiresIn,
    timeStamp,
    accessTokenHasntExpired,
    setAuthDataFromLocalStorage
  }
}

function getRefreshToken(refreshToken, setAuthData) {
  return axios.post(`${process.env.REACT_APP_URL}/refresh`, {
    refreshToken
  }).then(res => {
    setAuthData(res)
  }).catch((err) => {
    console.log('err 2: ', err);
    window.location = '/'
  })
}

function getAccessToken() {
  return axios.post(`${process.env.REACT_APP_URL}/login`, {
    code: code
  }).then(res => {
    window.history.pushState({}, null, '/')
    return res
  }).catch((err) => {
    console.log('err 1: ', err);
    // window.location = '/'
  })
}

export {
  getRefreshToken,
  getAccessToken,
  useAuthDataForContext
}