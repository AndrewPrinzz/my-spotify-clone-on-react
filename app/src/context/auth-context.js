import React from 'react'

import SpotifyWebApi from 'spotify-web-api-node'
import { useSpotifyData } from 'utils/hooks'
import { getAccessToken, getRefreshToken, useAuthDataForContext } from 'utils/auth'
import { FullPageSpinner } from 'components/lib'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

// just by moving this out and kicking it off as soon as possible we can scratch things over to the left a little bit
const userPromise = getAccessToken()

function AuthProvider(props) {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID
  })

  const {
    data,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    run
  } = useSpotifyData()

  const {
    setAuthData,
    clearAuthData,
    accessToken,
    refreshToken,
    expiresIn,
    timeStamp,
    accessTokenHasntExpired,
    setAuthDataFromLocalStorage
  } = useAuthDataForContext(spotifyApi)

  const { run: refreshTokenRun } = useSpotifyData()

  React.useEffect(() => {
    // if we have the user's token in local storage we set it for refreshing the refresh token
    if (accessTokenHasntExpired) {
      setAuthDataFromLocalStorage()
      run(Promise.resolve())
      return
    }
    // if access token expired then we clear all the data
    clearAuthData(spotifyApi)
    run(userPromise)
  }, [run])

  React.useEffect(() => {
    if (data || accessToken && expiresIn && timeStamp) {

      // console.log('refreshIn ', refreshIn);
      // console.log('timeStamp: ', timeStamp);
      // console.log('Date.now(): ', Date.now());
      // console.log('expiresIn: ', expiresIn);
      // console.log('Minutes till refreshing token: ', refreshIn / 3600);
      // console.log('Minutes since token was set: ', (Date.now() - timeStamp) / 1000 / 60)
      // console.log('Milliseconds since token was set: ', (Date.now() - timeStamp))
      // console.log('Milliseconds token will expire: ', expiresIn * 1000 - (Date.now() - timeStamp))
      // console.log('milliseconds token will be reset ', (expiresIn * 1000) - (10800) - (Date.now() - timeStamp))
      // console.log('minutes token will be reset ', ((expiresIn * 1000) - (10800) - (Date.now() - timeStamp)) / 60 / 1000)

      // once we got data from loggining in we just set it
      if (data) setAuthData(data)
      // refresh token based on its interval
      const interval = setInterval(() => {
        // get all the data from refreshToken
        refreshTokenRun(getRefreshToken(refreshToken, setAuthData))
      },
        // we’re essentially gonna refresh three minutes before it expires
        (expiresIn * 1000) - (10800) - (Date.now() - timeStamp)
      )
      return () => clearInterval(interval)
    }
  }, [data, accessToken, refreshTokenRun])

  const login =
    "https://accounts.spotify.com/authorize?client_id=b614d13fd2e74dec81743395e7d0efd6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

  const logout = () => {
    clearAuthData(spotifyApi)
    window.location = '/'
  }

  // anytime you pass a value to a provider if you’re creating that value during render that’s gonna trigger all of the consumers to render anytime this provider rerenders. Because if the provider value changes between renders all the consumers will be rerendered to get that change update. 
  const value = React.useMemo(() => ({ login, logout, accessToken, spotifyApi }), [
    login,
    logout,
    accessToken,
    spotifyApi
  ])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return 'Error'
  }

  if (isSuccess || accessToken) {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken)
    }

    return (
      <AuthContext.Provider value={value} {...props} />
    )
  }
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`)
  }
  return context
}

export {
  AuthProvider,
  useAuth
}