import React from 'react'
import axios from 'axios'
import {useAuth} from 'utils/hooks'
import SpotifyWebApi from 'spotify-web-api-node'

const CodeContext = React.createContext()
CodeContext.displayName = 'CodeContext'

function CodeProvider(props) {
  const code = new URLSearchParams(window.location.search).get('code')

  return <CodeContext.Provider value={code} {...props} />
}

function useCode(params) {
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

const PlayerContext = React.createContext()
PlayerContext.displayName = 'PlayerContext'

function PlayerProvider(props) {
  const [player, setPlayer] = React.useState()

  const value = [player, setPlayer]

  return <PlayerContext.Provider value={value} {...props} />
}

function usePlayer() {
  const context = React.useContext(PlayerContext)
  if (!context) {
    throw new Error(`Player must be rendered within the PlayerProvider`)
  }
  return context
}

export {
  CodeProvider,
  useCode,
  SpotifyWebAPIProvider,
  useSpotifyWebAPI,
  AccessTokenProvider,
  useAccessToken,
  PlayerProvider,
  usePlayer
}