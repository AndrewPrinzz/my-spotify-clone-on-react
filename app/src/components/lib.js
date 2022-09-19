import { css, injectGlobal } from '@emotion/css'
import * as colors from 'styles/colors'
import * as sizes from 'styles/sizes'
import 'styles/fonts'
import navbgc from 'assets/img/navbar/navbar-small.png'
import bgclogin from 'assets/img/background-login.jpg'
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import SpotifyWebPlayer from 'react-spotify-web-playback/lib'

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100vh;
  background-image: url(${bgclogin});
  background-size: cover;
`

export const LoginButton = styled.a`
  display: flex;
  margin-top: 25px;
  border-radius: 10px;
  color: ${colors.base};
  font-weight: 700;
  font-size: 20px;
  background: ${colors.lightgray};
  padding: 20px 35px;
  cursor: pointer;
`

export const NavBar = styled.nav`
  background-image: url(${navbgc});
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 421px;
  min-width: 421px;
  padding: 80px;
`

export const NavPfp = styled.img`
  max-width: 74px;
  max-height: 74px;
  object-fit: cover;
  border-radius: 50px; 
  margin-right: 21px;
`

export const NavName = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.base};
`

export const MenuIcon = styled.div`
  width: 30px;
  height: 27px;
  text-align: center;
  cursor: pointer;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 7px;
`

export const MenuItem = styled.div`
  font-weight: 700;
  font-size: 20px;
  padding-left: 21px;
  cursor: pointer;
  color: inherit;
`

const menuDotVariants = {
  default: {
    color: colors.gray
  },
  active: {
    color: colors.base,
    fill: colors.base,
    position: `relative`,
    transition: '0',
    borderRight: `3px solid ${colors.base}`,
    // display: 'none',
    '::before': {
      transition: '0s',
      content: '""',
      boxShadow: `61px 0px 22px ${colors.base}`,
      width: `30px`,
      height: `27px`,
      position: `absolute`,
      left: `-61px`
    },
    svg: {
      path: {
        transition: '0.5s',
        fill: colors.base
      }
    }
  }
}

export const MenuDot = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 45px;
  text-decoration: none;
  color: ${colors.gray};
  ${({variant = 'default'}) => menuDotVariants[variant]}
`

export const MenuLink = styled.span`
  display: flex;
  align-items: center;
  margin-top: 45px;
  color: ${colors.gray};
  ${({variant = 'default'}) => menuDotVariants[variant]}
`

export const Browse = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 78px;
  margin-left: 112px;
  width: ${sizes.container};
  padding-bottom: 300px;
`

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  marginTop: 10px;
  input {
    width: 100%;
    min-height: 60px;
    background: ${colors.dark};
    border: 1px solid #333333;
    border-radius: 50px;
    padding-left: 82px;
    color: ${colors.base};
    font-size: 16px;
    :focus {
      outline: none
    }
    ::placholder {

    }
  }
  ::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 35px;
    width: 18px;
    height: 18px;
    border: 1px solid #fff;
    border-radius: 50px;
  }
`

export const PlayListItems = styled.div`
  display: flex;
  justify-content: space-between;
`
export const PlayListItem = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 365px;
  max-width: 365px;
  flex-direction: column;
`

export const PlaylistImage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  position: relative;
  min-width: 365px;
  max-width: 365px;
  max-height: 365px;
  min-height: 365px;
  border-radius: 12px;
  background-repeat: no-repeat;
  background-size: cover;
  ::before {
    /* content: ''; */
    position: absolute;
    height: 140px;
    width: 100%;
    border-radius: 0px 0px 12px 12px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    bottom: 0;
  } 
  ${({color = 'F8A2D9', cover, playlistHeight}) => ({
    height: `${playlistHeight}px`,
    backgroundImage: `url(${cover})`,
    ":before": {
      background: `linear-gradient(179.31deg, rgba(196, 196, 196, 0) 0.59%, ${color} 99.4%)`,
    },
    "svg rect": {
      fill: color
    }
  })}
`

export const PlayListTracks = styled.div`
  width: fit-content;
  margin-top: 5px;
  font-size: 14px;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.02em;
  color: ${colors.gray};
`

export const PlayListTitle = styled.div`
  margin-top: 15px;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const PlayListGenre = styled.div`
  font-size: 26px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: 26px;
  font-weight: bold;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const PlayListItemIcon = styled.div`
  margin-top: auto;
  margin-left: 26px;
  margin-bottom: 26px;
  z-index: 1;
  width: 50px;
  height: 50px;
`

export const Greeting = styled.div`
  margin-top: 46px;
  font-size: 50px;
  line-height: 61px;
  letter-spacing: 0.02em;
  font-weight: bold;
  color: ${colors.base};
  line-height: 61px;
`

/* .js component */

export const InterfaceTitle = styled.div`
  margin-top: 60px;
  font-size: 30px;
  font-weight: bold;
`

export const InterfaceDspr = styled.div`
  margin-top: 11px;
  font-size: 16px;
  color: ${colors.gray};
  font-weight: bold;
`

export const SimilarBlocks = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SimilarBlock = styled.div`
  width: 45%;
  /* margin-left: 27px; */
  `

export const Track = styled.div`
  display: flex;
  width: 48%;
  align-items: center;
  margin-top: 24px;
`

export const TrackItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const TrackImage = styled.div`
  max-width: 70px;
  max-height: 70px;
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  /*
  ::before {
    content: ''!important;
    position: absolute;
    left: -27px;
  }
  */
  img {
    cursor: pointer;
    border-radius: 10px;
    max-width: 70px;
    max-height: 70px;
    min-width: 70px;
    min-height: 70px;
  }
  /*
  ${({number}) => ({
    ":before": {
      content: `'${number}'`,
    },
  })}
  */
`

export const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

export const TrackAuthor = styled.div`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: ${colors.base};
  max-width: 430px;
  text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const TrackName = styled.div`
  margin-top: 7px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray}
`

export const RecentlyPlayedItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  position: relative;
  width: 237px;
  height: 237px;
  border-radius: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  ::before {
    content: '';
    position: absolute;
    height: 140px;
    width: 100%;
    border-radius: 0px 0px 50px 50px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    bottom: 0;
  }
  ${({ color = 'F8A2D9', cover }) => ({
    backgroundImage: `url(${cover})`,
    ":before": {
      background: `linear-gradient(179.31deg, rgba(196, 196, 196, 0) 0.59%, ${color} 99.4%)`,
    },
    "svg rect": {
      fill: color
    }
  })}
`

export const Login = styled.a`

`

export const PolygonTitle = styled.div`
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 600;
  color: ${colors.base}
`

export const PolygonBlock = styled.div`
  margin-top: 20px;
`

export const MusicResults = styled.div`
  
`

export const SpotifyWebPlayerStyled = styled(SpotifyWebPlayer)`
  background: transparent!important;
`

export const PlaylistCover = styled.div`
  display: flex;
  align-items: end;
  padding: 78px 112px;
  background: linear-gradient(256.42deg, #212E4C 40.27%, rgba(33, 46, 76, 0.13) 96.22%, rgba(33, 46, 76, 0.63) 100%);
  width: 100%;
`

export const PlaylistScreen = styled.div`
  width: 100%;
`

export const PlaylistAlbumTotalTracks = styled.div`
  margin-top: 13px;
  font-weight: 300;
  font-size: 21px;
  line-height: 26px;
  letter-spacing: 0.02em;
  color: ${colors.base};
`

export const PlaylistAlbumArtist = styled.div`
  margin-top: 6px;
  font-weight: 700;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: ${colors.base};
`

export const PlaylistAlbumName = styled.div`
  margin-top: 9px;
  font-weight: 700;
  font-size: 52px;
  line-height: 63px;
  letter-spacing: 0.02em;
  color: ${colors.base};
`

export const PlaylistAlbumText = styled.div`
  margin-top: 32px;
  font-weight: 700;
  font-size: 21px;
  line-height: 26px;
  letter-spacing: 0.02em;
  color: ${colors.base};
`

export const PlaylistImageCover = styled(PlaylistImage)`
  margin-right: 45px;
`

export const PlaylistBrowseBlockTracks = styled.div`
  min-width: 50%;
  max-width: 50%;
`

export const PlaylistBrowseBlockSimilarAlbums = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const PlaylistBrowseBlockSimilarAlbumsContent = styled.div`
  display: flex;
  flex-wrap: wrap
`

export const PlaylistContainer = styled.div`
  width: ${sizes.container};
  display: flex;
  align-items: flex-start;
  margin-top: 35px;
  margin-left: 112px;
  width: ${sizes.container};
  padding-bottom: 300px;
`

export const PlaylistAlbumDescription = styled.div`
  margin-top: 6px;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: white;
`

export const SimilarPlaylist = styled(PlaylistImageCover)`
  max-width: 200px;
  min-width: 200px;
  max-height: 200px;
  min-height: 200px;
`