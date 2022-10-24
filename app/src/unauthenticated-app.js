/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {InterfaceDspr, InterfaceTitle, LoginContainer, LoginButton} from 'components/lib'
import {BrowserRouter as Router, Link as RouterLink, Routes, Route, useMatch} from 'react-router-dom'
import {Polygon} from 'screens/polygon'
import {timeGreeting} from 'components/time-greeting'
import {useAuth} from 'context/auth-context'
import * as colors from 'styles/colors'

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/polygon" element={<Polygon />} />
    </Routes>
  )
}

function Login() {
  const {login} = useAuth()
  
  return (
    <LoginContainer>
      <InterfaceTitle
        css={{
          '@media (max-width: 480px)': {
            marginTop: 0,
            fontSize: '34px'
          }
        }}
      >
        {timeGreeting}
      </InterfaceTitle>
      <InterfaceDspr css={{
        maxWidth: '570px',
        textAlign: 'center',
        marginTop: '25px',
      }}>
        Hi! This app is based on Spotify API :) <br /><br /> 
        
        This application is currently on Spotify's review so some things might not work here. So <span style={{color: 'red'}}>to use the application with all the functionality</span> you should text me so you can test it. I'll add you to my testers in my developers dashboard! :) After this everything will work swimmingly
        <br /><br />
        My WhatsApp is +79081676811. Feel free to text me :)
      </InterfaceDspr>
      <LoginButton href={login}>
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

export default UnauthenticatedApp