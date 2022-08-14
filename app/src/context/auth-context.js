import React from 'react'
import axios from 'axios'
import {useAuth} from 'utils/hooks'

const AccessTokenContext = React.createContext()
AccessTokenContext.displayName = 'AccessTokenContext'

function AccessTokenProvider(props) {
  const [accessToken, setAccessToken] = React.useState()

  const value = [accessToken, setAccessToken]

  return <AccessTokenContext.Provider value={value} {...props} />
}

function useAccessToken() {
  const context = React.useContext(AccessTokenContext)
  if (!context) {
    throw new Error(`SpotifyWebAPI must be rendered within the SpotifyWebAPIProvider`)
  }
  return context
}

export {
  AccessTokenProvider,
  useAccessToken,
}