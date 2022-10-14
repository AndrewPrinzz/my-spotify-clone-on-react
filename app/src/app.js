import React from 'react'
import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
import {useLocalStorageState} from 'utils/hooks'
import * as auth from 'auth-provider'
import {useAccessToken} from 'context/auth-context'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {LOCALSTORAGE_KEYS} from 'context/auth-context'

const login =
  "https://accounts.spotify.com/authorize?client_id=b614d13fd2e74dec81743395e7d0efd6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const code = new URLSearchParams(window.location.search).get('code')

function getUser() {
  let user = null

  const token = auth.getToken()
}

function App() {
  const [accessToken, setAccessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  const [localStorageAccessToken, setLocalStorageAccessToken] = useLocalStorageState(LOCALSTORAGE_KEYS.accessToken)
  
  const getToken = auth.getToken()
  
  const getAccessToken = localStorageAccessToken ? localStorageAccessToken : getToken
  
  // 
  React.useEffect(() => {
    if (!getAccessToken) return
    // 👩‍🏫 We use this awesome API in the entire app: `https://github.com/thelinmichael/spotify-web-api-node`
    spotifyApi.setAccessToken(getAccessToken)
    setAccessToken(getAccessToken)
    setLocalStorageAccessToken(getAccessToken)
  }, [getAccessToken])

  const [localStorageTokenExpireTime] = useLocalStorageState('__auth_provider_expire_time__')
  const [localStorageTimeStamp] = useLocalStorageState('__auth_provider_token_timestamp__')
  // This function uses the timestamp stored in local storage to check if the amount of time elapsed since the timestamp is greater than the access token's expire time (3600 seconds). If it is, then we can assume the token has expired and we need to fetch a new one.

  const isTokenActual = React.useRef(
    ((Date.now() - Number(localStorageTimeStamp)) / 1000) < Number(localStorageTokenExpireTime)
  )

  if (!isTokenActual.current) {
    auth.clearAuthData()
  }

  console.log('isTokenActual: ', isTokenActual);
  console.log('((Date.now() - Number(localStorageTimeStamp)) / 1000): ', ((Date.now() - Number(localStorageTimeStamp)) / 1000));
  console.log('Number(localStorageTokenExpireTime): ', Number(localStorageTokenExpireTime));

  

  // check if we have access
  return (
    <>
      {Boolean(code) || Boolean(isTokenActual.current) ?
        <AuthenticatedApp logout={auth.logout} /> : 
        <UnauthenticatedApp />
      }
    </>
  )
}

export default App