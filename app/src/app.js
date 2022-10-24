import React from 'react'
import {useAuth} from 'context/auth-context'
import {FullPageSpinner} from 'components/lib'

// If we're on the UnauthenticatedApp page then we don't load the AuthenticatedApp
const AuthenticatedApp = React.lazy(() => 
  import(/* webpackPrefetch: true */ './authenticated-app')
)

// If we're on the AuthenticatedApp page then we don't load the UnauthenticatedApp
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {data, accessToken} = useAuth()
  
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {data || accessToken ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </React.Suspense>
  )
}

export default App