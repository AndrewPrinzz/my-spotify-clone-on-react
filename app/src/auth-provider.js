import React from 'react'
import {useLocalStorageState} from "utils/hooks"
import {
  useAccessToken, 
  useRefreshToken, 
  useExpiresIn, 
  useTimeStamp,
} from 'context/auth-context'
import axios from "axios"
import SpotifyWebApi from 'spotify-web-api-node'



const LOCALSTORAGE_KEYS = {
  accessToken: '__auth_provider_access_token__',
  refreshToken: '__auth_provider_refresh_token__',
  expiresIn: '__auth_provider_expire_time__',
  timeStamp: '__auth_provider_token_timestamp__',
}

const SpotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
})

function clearAuthData() {
  window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, '')
  window.localStorage.setItem(LOCALSTORAGE_KEYS.refreshToken, '')
  window.localStorage.setItem(LOCALSTORAGE_KEYS.expiresIn, '')
  window.localStorage.setItem(LOCALSTORAGE_KEYS.timeStamp, '')
  SpotifyApi.setAccessToken('')
  SpotifyApi.setRefreshToken('')
}

function useGetToken() {
  const code = new URLSearchParams(window.location.search).get('code')
  
  const [accessToken, setAccessToken] = useAccessToken()
  const [localStorageAccessToken, setLocalStorageAccessToken] = useLocalStorageState(LOCALSTORAGE_KEYS.accessToken)
  const [refreshToken, setRefreshToken] = useRefreshToken()
  const [localStorageRefreshToken, setLocalStorageRefreshToken] = useLocalStorageState(LOCALSTORAGE_KEYS.refreshToken)
  const [expiresIn, setExpiresIn] = useExpiresIn()
  const [localStorageExpiresIn, setlocalStorageExpiresIn] = useLocalStorageState(LOCALSTORAGE_KEYS.expiresIn)
  const [timeStamp, setTimestamp] = useTimeStamp()
  const [localStorageTimeStamp, setLocalStorageTimeStamp] = useLocalStorageState(LOCALSTORAGE_KEYS.timeStamp)
  
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

  React.useEffect(() => {
    // if we have the user's token in local storage we set it for refreshing the refresh token
    if (localStorageRefreshToken && localStorageExpiresIn) {
      setRefreshToken(localStorageRefreshToken)
      setExpiresIn(localStorageExpiresIn)
      setTimestamp(localStorageTimeStamp)
      setAccessToken(localStorageAccessToken)
    }
    if (!code) return

    axios.post(`${process.env.REACT_APP_URL}/login`, {
      code: code
    }).then(res => {
      setAuthData(res)
      window.history.pushState({}, null, '/')
    }).catch((err) => {
      console.log('err 1: ', err);
      // window.location = '/'
    })
  }, [code])

  React.useEffect(() => {
    // if we have values in local storage we should set it back
    if (!refreshToken || !expiresIn || !timeStamp) return
    const interval = setInterval(() => {
      axios.post(`${process.env.REACT_APP_URL}/refresh`, {
        refreshToken
      }).then(res => {
        console.log('res refresh token: ', res);
        setAuthData(res)
      }).catch((err) => {
        console.log('err 2: ', err);
        window.location = '/'
      })
      // calc time the token will expire (spoiler: it's 3600ms)
    }, 
      // we’re essentially gonna refresh three minutes before it expires
      timeStamp + (expiresIn * 1000 - 10800) - Date.now()
      // 5000
      )
      if (timeStamp && expiresIn) {
        console.log('(expiresIn - 60) * 1000): ', timeStamp + (expiresIn * 1000 - 10800) - Date.now());   
      }
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])
  console.log('(expiresIn - 60) * 1000): ', timeStamp + (expiresIn * 1000 - 10800) - Date.now());   
  return accessToken
}

function logout() {
  clearAuthData()
  window.location = '/'
}

const authUrl = "https://accounts.spotify.com/authorize?client_id=b614d13fd2e74dec81743395e7d0efd6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
// const authUrl = process.env.REACT_APP_AUTH_URL

function client(params) {
  
}

export {useGetToken as getToken, logout, clearAuthData, LOCALSTORAGE_KEYS}