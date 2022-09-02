import React from 'react'


const LOCALSTORAGE_KEYS = {
  accessToken: '__auth_provider_access_token__',
  refreshToken: '__auth_provider_refresh_token__',
  expiresIn: '__auth_provider_expire_time__',
  timeStamp: '__auth_provider_token_timestamp__',
}

const AccessTokenContext = React.createContext()
AccessTokenContext.displayName = 'AccessTokenContext'

function AccessTokenProvider(props) {
  const [accessToken, setAccessToken] = React.useState()

  const value = [accessToken, setAccessToken]

  return <AccessTokenContext.Provider value={value} {...props} />
}

function useAccessToken(value) {

  const [accessToken, setAccessToken] = React.useContext(AccessTokenContext)

  const context = [accessToken, setAccessToken]

  if (!context) {
    throw new Error(`AccessToken must be rendered within the AccessTokenProvider`)
  }
  return context
}

function useAccessFakeToken(params) {
  const [accessToken, setAccessToken] = useAccessToken()
}

const RefreshTokenContext = React.createContext()
RefreshTokenContext.displayName = 'RefreshTokenContext'

function RefreshTokenProvider(props) {
  const [refreshToken, setRefreshToken] = React.useState()

  const value = [refreshToken, setRefreshToken]

  return <RefreshTokenContext.Provider value={value} {...props} />
}

function useRefreshToken() {
  const context = React.useContext(RefreshTokenContext)
  if (!context) {
    throw new Error(`RefreshToken must be rendered within the RefreshTokenProvider`)
  }
  return context
}

const ExpiresInContext = React.createContext()
ExpiresInContext.displayName = 'ExpiresInContext'

function ExpiresInProvider(props) {
  const [expiresIn, setExpiresIn] = React.useState()

  const value = [expiresIn, setExpiresIn]

  return <ExpiresInContext.Provider value={value} {...props} />
}

function useExpiresIn() {
  const context = React.useContext(ExpiresInContext)
  if (!context) {
    throw new Error(`ExpiresIn must be rendered within the ExpiresInProvider`)
  }
  return context
}

const TimeStampContext = React.createContext()
TimeStampContext.displayName = 'TimeStampContext'

function TimeStampProvider(props) {
  const [timeStamp, setTimeStamp] = React.useState()

  const value = [timeStamp, setTimeStamp]

  return <TimeStampContext.Provider value={value} {...props} />
}

function useTimeStamp() {
  const context = React.useContext(TimeStampContext)
  if (!context) {
    throw new Error(`ExpiresIn must be rendered within the ExpiresInProvider`)
  }
  return context
}

export {
  AccessTokenProvider,
  useAccessToken,
  RefreshTokenProvider,
  useRefreshToken,
  ExpiresInProvider,
  useExpiresIn,
  TimeStampProvider,
  useTimeStamp,
  LOCALSTORAGE_KEYS
}