import {CodeProvider, SpotifyWebAPIProvider, AccessTokenProvider, PlayerProvider} from 'context/auth-context'
import { QueryDataCacheProvider } from 'context/query-data-cache-context'
import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  // check if we have access
  return (
    <>
      <CodeProvider>
        <SpotifyWebAPIProvider>
          <AccessTokenProvider>
            <PlayerProvider>
              {code ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </PlayerProvider>
          </AccessTokenProvider>
        </SpotifyWebAPIProvider>
      </CodeProvider>
    </>
  )
  
  // return <UnauthenticatedApp />
}

export default App