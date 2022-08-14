import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const CodeContext = React.createContext()
CodeContext.displayName = 'CodeContext'

function CodeProvider(props) {
  const code = new URLSearchParams(window.location.search).get('code') || false

  return <CodeContext.Provider value={code} {...props} />
}

function useCode() {
  const context = React.useContext(CodeContext)
  if (!context) {
    throw new Error(`Code must be rendered within the CodeProvider`)
  }
  return context
}

const SpotifyWebAPIContext = React.createContext()
CodeContext.displayName = 'SpotifyWebAPIContext'

function SpotifyWebAPIProvider(props) {
  const api = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID
  })

  return <SpotifyWebAPIContext.Provider value={api} {...props} />
}

function useSpotifyWebAPI() {
  const context = React.useContext(SpotifyWebAPIContext)
  if (!context) {
    throw new Error(`SpotifyWebAPI must be rendered within the SpotifyWebAPIProvider`)
  }
  return context
}

export {
  CodeProvider,
  useCode,
  SpotifyWebAPIProvider,
  useSpotifyWebAPI,
}