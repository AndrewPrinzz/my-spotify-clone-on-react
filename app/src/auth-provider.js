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
import UnauthenticatedApp from 'unauthenticated-app'

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
  

  React.useEffect(() => {
    // if we have access token in our localStorage then we do nothing
    if (!code) return

    axios.post(`${process.env.REACT_APP_URL}/login`, {
      code: code
    }).then(res => {
      setAccessToken(res.data.accessToken)
      setLocalStorageAccessToken(res.data.accessToken)

      setRefreshToken(res.data.refreshToken)
      setLocalStorageRefreshToken(res.data.refreshToken)

      setExpiresIn(res.data.expiresIn)
      setlocalStorageExpiresIn(res.data.expiresIn)

      setTimestamp(Date.now())
      setLocalStorageTimeStamp(Date.now())

      window.history.pushState({}, null, '/')
    }).catch((err) => {
      console.log('err 1: ', err);
      // window.location = '/'
    })
  }, [code])

  React.useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios.post(`${process.env.REACT_APP_URL}/refresh`, {
        refreshToken
      }).then(res => {
        setAccessToken(res.data.accessToken)
        setLocalStorageAccessToken(res.data.accessToken)

        setRefreshToken(res.data.refreshToken)
        setLocalStorageRefreshToken(res.data.refreshToken)

        setExpiresIn(res.data.expiresIn)
        setlocalStorageExpiresIn(res.data.expiresIn)

        setTimestamp(Date.now())
        setLocalStorageTimeStamp(Date.now())
      }).catch((err) => {
        console.log('err 2: ', err);
        window.location = '/'
      })
      // calc time the token will expire (spoiler: it's 3600ms)
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}

// function handleUserResponse({ user }) {
//   window.localStorage.setItem(localStorageKey, user.token)
//   return user
// }

function login(params) {
  
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