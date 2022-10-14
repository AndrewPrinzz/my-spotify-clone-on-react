import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AccessTokenProvider, ExpiresInProvider, RefreshTokenProvider, TimeStampProvider} from 'context/auth-context'
import {CodeProvider, SpotifyWebAPIProvider} from 'context/spotify-web-api-context'
import {PlayerProvider, OffsetProvider} from 'context/player-context'
import {UserDataProvider} from 'context/user-data-context'
import {SearchQueryProvider} from 'context/search-query-context'
import {AuthContextNew} from 'context/auth-context'


function TemporaryAppProviders({children}) {
  return (
    <>
      <AuthContextNew.Provider value={''}>
        <CodeProvider>
          <SearchQueryProvider>
            <SpotifyWebAPIProvider>
              <AccessTokenProvider>
                <UserDataProvider>
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
                </UserDataProvider>
              </AccessTokenProvider>
            </SpotifyWebAPIProvider>
          </SearchQueryProvider>
        </CodeProvider>
      </AuthContextNew.Provider>
    </>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      // if come back to the page it doesn’t refetch those query 
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        // if the error.status is 404 then we’re not gonna bother retrying we’ll just return false
        if (error.status === 404) return false
        // Otherwise if the failerCount is less than two so we haven’t retried twice already then we’ll return true and we’ll allow them to retry it again. Sometimes there’re weird network things maybe retrying it will fix the problem. 
        else if (failureCount < 2) return true
        // Finally if neither of those is true then we’ll just return false
        else return false
      }
    },
    mutations: {
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null
    }
  }
})

function AppProviders({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      
      <Router>
        <TemporaryAppProviders>
          {children}
        </TemporaryAppProviders>
      </Router>
    </QueryClientProvider>
  )
}

export {AppProviders}