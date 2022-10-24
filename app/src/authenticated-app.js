/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {css} from '@emotion/css'
import * as colors from 'styles/colors'
import {BrowserRouter as Router, Link as RouterLink, Routes, Route, useMatch, useLocation } from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import {NavBar, NavName, NavPfp, MenuItem } from './components/lib'
import {Home as HomeIcon, Note as NoteIcon, Playlists as PlaylistIcon, Albums as AlbumIcon, SearchIcon, LogoutIcon} from 'components/icons'
import {ErrorMessage, FullPageErrorFallback} from 'components/error-fallbacks'
import pfp from 'assets/img/navbar/pfp.png'
import {Home} from 'screens/home'
import {Playlist} from 'screens/playlist'
import {Search} from 'screens/search'
import {Album} from 'screens/album'
import {YourLibrary} from 'screens/your-library'
import {YourAlbums} from 'screens/your-albums'
import {NotFoundScreen} from 'screens/not-found'
import {useAuth} from 'context/auth-context'
import {Player} from 'components/player'
import {useQuery} from 'react-query'

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

  return (
    // Error boundary provider
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <div className={css`
          background: linear-gradient(101.32deg, #292929 1.55%, #1E1322 90.79%);
          display: flex;
        `}>
          <Nav />
          <div css={{width: '100%'}}>
            {/* If we have an error we show an error we've written above */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AppRoutes />
            </ErrorBoundary>
          </div>
          <div css={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            background: '#000'
          }}>
            <Player />
          </div>
        </div>
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
        },
        '@media (max-width: 992px)': {
          borderRight: '0'
        }        
      }
        : null}
        `}
      {...props}
    />
  )
}

function Nav() {
  const {logout, spotifyApi} = useAuth()

  const {data: user, isLoading, isSuccess, isLoadingError} = useQuery({
    queryKey: 'user',
    queryFn: () => spotifyApi.getMe()
  })

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
        {/* {value.body.display_name} */}
        <br />
        {isLoading ? (
          <>
            <NavPfp src={pfp} />
            <NavName>Loading...</NavName>
          </>
        ) : isSuccess ? (
          <>
            {/* <NavPfp src={user.body.images[0].url} /> */}
            <NavPfp src={pfp} />
            <NavName>
              {user.body.display_name}
            </NavName>
          </>
        ) : null}
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
            <SearchIcon />
            <MenuItem>Search</MenuItem>
          </NavLink>
        </li>
        <li>
          <NavLink to="/your-library">
            <NoteIcon />
            <MenuItem>Your Library</MenuItem>
          </NavLink>
        </li>
        <li>
          <NavLink to="/your-albums">
            <PlaylistIcon />
            <MenuItem>Your Albums</MenuItem>
          </NavLink>
        </li>
      </ul>
      <a
        css={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '45px',
          color: '#fff',
          cursor: 'pointer',
          textTransform: 'uppercase',
          textDecoration: 'underline',
          fontWeight: 'bold',
          marginTop: '90px',
        }}
        onClick={logout}
      >
        <LogoutIcon />
        <span
          css={{
            display: 'flex',
            marginLeft: '10px',
            '@media (max-width: 992px)': {
              display: 'none'
            }
          }}
        >
          logout
        </span>
      </a>
    </NavBar>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/your-library" element={<YourLibrary />} />
      <Route path="/search" element={<Search />} />
      <Route path="/playlist/:id" element={<Playlist />} />
      <Route path="/album/:id" element={<Album />} />
      <Route path="/your-library/" element={<YourLibrary />} />
      <Route path="/your-albums/" element={<YourAlbums />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AuthenticatedApp