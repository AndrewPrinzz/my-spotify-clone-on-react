import React from 'react'
import {AccessTokenProvider, ExpiresInProvider, RefreshTokenProvider, TimeStampProvider} from 'context/auth-context'
import {CodeProvider, SpotifyWebAPIProvider} from 'context/spotify-web-api-context'
import {PlayerProvider, OffsetProvider} from 'context/player-context'
import {QueryDataCacheProvider} from 'context/query-data-cache-context'
import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
import {useLocalStorageState} from 'utils/hooks'
import * as auth from 'auth-provider'


const code = new URLSearchParams(window.location.search).get('code')

function AppProviders({children}) {
  return (
    <CodeProvider>
      <SpotifyWebAPIProvider>
        <AccessTokenProvider>
          <PlayerProvider>
            <OffsetProvider>
              <ExpiresInProvider>
                <RefreshTokenProvider>
                  <TimeStampProvider>
                    {children}
                  </TimeStampProvider>
                </RefreshTokenProvider>
              </ExpiresInProvider>
            </OffsetProvider>
          </PlayerProvider>
        </AccessTokenProvider>
      </SpotifyWebAPIProvider>
    </CodeProvider>
  )
}

function App() {
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

  const login =
    "https://accounts.spotify.com/authorize?client_id=b614d13fd2e74dec81743395e7d0efd6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

  // check if we have access
  return (
    <>
      <AppProviders>
        {/* {code ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}
        {Boolean(code) || Boolean(isTokenActual.current) ?
          <AuthenticatedApp logout={auth.logout} /> : 
          <UnauthenticatedApp />
        }
        {/* <AuthenticatedApp /> */}
      </AppProviders>
    </>
  )
  
  // return <UnauthenticatedApp />
}

export default App