import React from 'react'
import {css} from '@emotion/css'
import * as colors from 'styles/colors'
import {BrowserRouter as Router, Link as RouterLink, Routes, Route, useMatch } from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {NavBar, NavName, NavPfp, MenuItem } from './components/lib'
import {Home as HomeIcon, Note as NoteIcon, Playlists as PlaylistIcon } from 'components/icons'
import {ErrorMessage, FullPageErrorFallback} from 'components/error-fallbacks'
import pfp from 'assets/img/navbar/pfp.png'
import {Search} from 'screens/search'
import {Playlists} from 'screens/playlists'
import {NotFoundScreen} from 'screens/not-found'
import {Home} from 'screens/home'
import {useAuth} from 'utils/hooks'
import {useCode, useSpotifyWebAPI, useAccessToken} from 'context/auth-context'

// If we have an error
function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp() {
  const spotifyApi = useSpotifyWebAPI()
  const code = useCode()
  const accessToken = useAuth(code)
  const [, setAccessToken] = useAccessToken()

  React.useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    setAccessToken(accessToken)
  }, [accessToken])
  

  return (
    // Error boundary provider
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Router>
        <div className={css`
          background: linear-gradient(101.32deg, #292929 1.55%, #1E1322 90.79%);
          display: flex;
        `}>
          <Nav />
          {/* If we have an error we show an error we've written above */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

// creating our own NavLink
function NavLink(props) {
  const match = useMatch(props.to)
  return (
    <RouterLink className={css`
        display: flex;
        align-items: center;
        margin-top: 45px;
        color: ${colors.gray};
        text-decoration: none;
        :hover {
          color: ${colors.gray};
        }
        ${match ? {
        color: colors.base,
        fill: colors.base,
        position: `relative`,
        transition: '0',
        borderRight: `3px solid ${colors.base}`,
        '::before': {
          transition: '0s',
          content: '""',
          boxShadow: `61px 0px 22px ${colors.base}`,
          width: `30px`,
          height: `27px`,
          position: `absolute`,
          left: `-61px`
        },
        ':hover': {
          color: colors.base
        },
        svg: {
          path: {
            transition: '0.5s',
            fill: colors.base
          }
        }
      }
        : null}
        `}
      {...props}
    />
  )
}

function Nav() {
  return (
    <NavBar className={css`
      height: 100vh;
      position: sticky;
      top: 0px;
    `}>
      <div className={css`
        display: flex;
        align-items: center;
      `}>
        <NavPfp src={pfp} />
        <NavName>Alice</NavName>
      </div>
      <ul className={css`
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        padding-top: 7px;
      `}>
        <li>
          <NavLink to="/">
            <HomeIcon />
            <MenuItem>Home</MenuItem>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <NoteIcon />
            <MenuItem>Search</MenuItem>
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists">
            <PlaylistIcon />
            <MenuItem>Playlists</MenuItem>
          </NavLink>
        </li>
      </ul>
    </NavBar>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp