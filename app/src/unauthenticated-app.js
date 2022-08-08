/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {InterfaceDspr, InterfaceTitle, LoginContainer, LoginButton} from 'components/lib'
import {BrowserRouter as Router, Link as RouterLink, Routes, Route, useMatch} from 'react-router-dom'
import {Polygon} from 'screens/polygon'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=b614d13fd2e74dec81743395e7d0efd6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

function UnauthenticatedApp() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}


function Login() {
  return (
    <LoginContainer>
      <InterfaceTitle>Good Evening</InterfaceTitle>
      <InterfaceDspr css={{
        maxWidth: '570px',
        textAlign: 'center',
        marginTop: '25px',
      }}>
        Hi! This app is based on Spotify so you need to login with Spotify to enjoy it. No worries, maybe I won’t steal your account :) (It’s actually impossible, Spotify doesn’t let me do it)
      </InterfaceDspr>
      <LoginButton href={AUTH_URL}>
        Login with Spotify
      </LoginButton>
      <div css={{
        fontSize: '12px',
        fontWeight: 'bold',
        marginTop: '20px'
      }}>Or go to the test page :)</div>
      <RouterLink to="/polygon" css={{
        padding: '5px 10px',
        fontWeight: 700,
        fontSize: '12px',
        background: '#282828',
        cursor: 'pointer',
        borderRadius: '10px',
        color: '#fff',
        marginTop: '10px'
      }}>Let's go</RouterLink>
    </LoginContainer>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/polygon" element={<Polygon />} />
    </Routes>
  )
}

export default UnauthenticatedApp