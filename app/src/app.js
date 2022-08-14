import React from 'react'
import {AccessTokenProvider} from 'context/auth-context'
import {CodeProvider, SpotifyWebAPIProvider} from 'context/spotify-web-api-context'
import {PlayerProvider} from 'context/player-context'
import {QueryDataCacheProvider} from 'context/query-data-cache-context'
import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
import {useLocalStorageState} from 'utils/hooks'

const code = new URLSearchParams(window.location.search).get('code')
console.log('code: ', !!code);


function App() {
  const [localStorageTokenExpireTime] = useLocalStorageState('__auth_provider_expire_time__')
  const [localStorageTimeStamp] = useLocalStorageState('__auth_provider_token_timestamp__')
  // This function uses the timestamp stored in local storage to check if the amount of time elapsed since the timestamp is greater than the access token's expire time (3600 seconds). If it is, then we can assume the token has expired and we need to fetch a new one.
  const isTokenActual = React.useRef(
    (Date.now() - Number(localStorageTimeStamp) / 1000) > 
    localStorageTokenExpireTime
  )
  console.log('(Date.now() - Number(localStorageTimeStamp) / 1000): ', (Date.now() - Number(localStorageTimeStamp) / 1000));
  console.log('localStorageTokenExpireTime: ', ((Date.now() - 3600) / 1000) + localStorageTokenExpireTime);
  console.log('isTokenActual: ', isTokenActual.current);

  // check if we have access
  return (
    <>
      <CodeProvider>
        <SpotifyWebAPIProvider>
          <AccessTokenProvider>
            <PlayerProvider>
              {/* {code ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}
              {Boolean(code) || Boolean(isTokenActual.current) ? <AuthenticatedApp /> : <UnauthenticatedApp />}
              {/* <AuthenticatedApp /> */}
            </PlayerProvider>
          </AccessTokenProvider>
        </SpotifyWebAPIProvider>
      </CodeProvider>
    </>
  )
  
  // return <UnauthenticatedApp />
}

export default App