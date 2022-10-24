/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {keyframes} from '@emotion/css'
import * as colors from 'styles/colors'
import * as sizes from 'styles/sizes'
import 'styles/fonts'
import navbgc from 'assets/img/navbar/navbar-small.png'
import bgclogin from 'assets/img/background-login.jpg'
import styled from '@emotion/styled/macro'
import {Link} from 'react-router-dom'
import SpotifyWebPlayer from 'react-spotify-web-playback/lib'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

export const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})

Spinner.defaultProps = {
  'aria-label': 'loading',
}

export function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: colors.dark
      }}
    >
      <Spinner />
    </div>
  )
}

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
  @media (max-width: 1700px) {
    max-width: 380px;
    min-width: 380px;
  }
  @media (max-width: 1050px) {
    padding: 40px;
    max-width: 300px;
    min-width: 300px;
  }
  @media (max-width: 992px) {
    padding: 16px;
    padding-top: 54px;
    max-width: 63px;
    min-width: 63px;
  }
`

export const NavPfp = styled.img`
  max-width: 74px;
  max-height: 74px;
  min-width: 74px;
  min-height: 74px;
  object-fit: cover;
  border-radius: 50px; 
  margin-right: 21px;
  background: ${colors.blue};
  @media (max-width: 1700px) {
    max-width: 68px;
    max-height: 68px;
    min-width: 68px;
    min-height: 68px;
  }
  @media (max-width: 992px) {
    max-width: 50px;
    max-height: 50px;
    min-width: 50px;
    min-height: 50px;
    transform: translateX(-9px);
  }
`

export const NavName = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.base};
  @media (max-width: 1700px) {
    font-size: 20px;
  }
  @media (max-width: 1050px) {
    font-size: 16px;
  }
  @media (max-width: 992px) {
    display: none;
  }
`

export const MenuIcon = styled.div`
  max-width: 30px;
  max-height: 30px;
  min-width: 30px;
  min-height: 30px;
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
  @media (max-width: 1700px) {
    font-size: 18px;
  }
  @media (max-width: 992px) {
    display: none
  }
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
    borderRight: `0px solid ${colors.base}`,
    '@media (max-width: 992px)': {
      borderRight: `0px solid ${colors.base}`,
    },
    // display: 'none',
    '::before': {
      transition: '0s',
      content: '""',
      boxShadow: `61px 0px 22px ${colors.base}`,
      width: `30px`,
      height: `27px`,
      position: `absolute`,
      left: `-61px`,
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
  margin: auto;
  margin-top: 78px;
  max-width: ${sizes.container};
  padding-bottom: 200px;
  width: 100%;
  max-width: 1167px;
  
  @media (max-width: 1700px) {
    max-width: 1100px;
  }
  @media (max-width: 1470px) {
    max-width: 950px;
  }
  @media (max-width: 1370px) {
    max-width: 900px;
  }
  @media (max-width: 1320px) {
    max-width: 850px;
  }
  @media (max-width: 1270px) {
    max-width: 800px;
  }
  @media (max-width: 1220px) {
    max-width: 750px;
  }
  @media (max-width: 1170px) {
    max-width: 720px;
  }
  @media (max-width: 1150px) {
    max-width: 700px;
  }
  @media (max-width: 1120px) {
    max-width: 650px;
  }
  @media (max-width: 1080px) {
    max-width: 600px;
  }
  @media (max-width: 992px) {
    max-width: 780px;
    margin-top: 54px;
  }
  @media (max-width: 900px) {
    max-width: 660px;
    margin-top: 54px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 0px;
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const PlayListItem = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 365px;
  max-width: 365px;
  flex-direction: column;
  @media (max-width: 1700px) {
    min-width: 330px;
    max-width: 330px;
  }
  @media (max-width: 1500px) {
    min-width: 300px;
    max-width: 300px;
  }
  @media (max-width: 1370px) {
    min-width: 280px;
    max-width: 280px;
  }
  @media (max-width: 1320px) {
    min-width: 250px;
    max-width: 250px;
  }
  @media (max-width: 1220px) {
    min-width: 230px;
    max-width: 230px;
  }
  @media (max-width: 1150px) {
    min-width: 210px;
    max-width: 210px;
  }
  @media (max-width: 1090px) {
    min-width: 190px;
    max-width: 190px;
  }
  @media (max-width: 992px) {
    min-width: 250px;
    max-width: 250px;
  }
  @media (max-width: 900px) {
    min-width: 210px;
    max-width: 210px;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
  }
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
  @media (max-width: 1700px) {
    min-width: 330px;
    max-width: 330px;
    min-height: 330px;
    max-height: 330px;
  }
  @media (max-width: 1500px) {
    min-width: 300px;
    max-width: 300px;
    min-height: 300px;
    max-height: 300px;
  }
  @media (max-width: 1370px) {
    min-width: 280px;
    max-width: 280px;
    min-height: 280px;
    max-height: 280px;
  }
  @media (max-width: 1320px) {
    min-width: 250px;
    max-width: 250px;
    min-height: 250px;
    max-height: 250px;
  }
  @media (max-width: 1220px) {
    min-width: 230px;
    max-width: 230px;
    min-height: 230px;
    max-height: 230px;
  }
  @media (max-width: 1150px) {
    min-width: 210px;
    max-width: 210px;
    min-height: 210px;
    max-height: 210px;
  }
  @media (max-width: 1090px) {
    min-width: 190px;
    max-width: 190px;
    min-height: 190px;
    max-height: 190px;
  }
  @media (max-width: 992px) {
    min-width: 250px;
    max-width: 250px;
    min-height: 250px;
    max-height: 250px;
  }
  @media (max-width: 900px) {
    min-width: 210px;
    max-width: 210px;
    min-height: 210px;
    max-height: 210px;
  }
  @media (max-width: 768px) {
    display: none;
  }
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

export const PlaylistImageMobile = styled.img`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    border-radius: 12px;
    width: 60%;
    margin-top: 40px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
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
  @media (max-width: 1320px) {
    font-size: 22px;
    max-width: 100%;
  }
  @media (max-width: 768px) {
    white-space: initial;
  }
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
  line-height: 45px;
  @media (max-width: 480px) {
    font-size: 40px;
  }
`

/* .js component */

export const InterfaceTitle = styled.div`
  margin-top: 60px;
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 20px;
  }
`

export const InterfaceDspr = styled.div`
  margin-top: 11px;
  font-size: 16px;
  color: ${colors.gray};
  font-weight: bold;
  @media (max-width: 480px) {
    font-size: 14px;
  }
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
  @media (max-width: 480px) {
    width: 100%;
  }
`

export const TrackItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 992px) {
    flex-direction: column;
  }
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
  @media (max-width: 480px) {
    max-width: 60px;
    max-height: 60px;
    min-width: 60px;
    min-height: 60px;
    img {
      max-width: 60px;
      max-height: 60px;
      min-width: 60px;
      min-height: 60px;
    }
  }
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
  @media (max-width: 1500px) {
    max-width: 328px;
  }
  @media (max-width: 1320px) {
    max-width: 280px;
  }
  @media (max-width: 1240px) {
    max-width: 240px;
  }
  @media (max-width: 1150px) {
    max-width: 200px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
  @media (max-width: 380px) {
    max-width: 180px;
  }
  @media (max-width: 360px) {
    max-width: 160px;
  }
  @media (max-width: 340px) {
    max-width: 140px;
  }
  @media (max-width: 320px) {
    max-width: 120px;
  }
`

export const TrackName = styled.div`
  margin-top: 7px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray};
  @media (max-width: 480px) {
    font-size: 10px;
  }
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
  width: 100%;
  align-items: end;
  background: linear-gradient(256.42deg, #212E4C 40.27%, rgba(33, 46, 76, 0.13) 96.22%, rgba(33, 46, 76, 0.63) 100%);
`

export const PlaylistCoverContainer = styled(Browse)`
  padding: 0;
  maring: 0;
  flex-direction: initial;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 78px;
  @media (max-width: 1500px) {
    margin-bottom: 40px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const AlbumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: initial;
  ${PlayListItem} {
    &:nth-of-type(3n+2) {
      margin: 0 36px;
      @media (max-width: 1700px) {
        margin: 0 55px;
      }
      @media (max-width: 1500px) {
        margin: 0 25px;
      }
      @media (max-width: 1370px) {
        margin: 0 30px;
      }
      @media (max-width: 1320px) {
        margin: 0 50px;
      }
      @media (max-width: 1270px) {
        margin: 0 25px;
      }
      @media (max-width: 1220px) {
        margin: 0 25px;
      }
      @media (max-width: 1170px) {
        margin: 0 15px;
      }
      @media (max-width: 1150px) {
        margin: 0 35px;
      }
      @media (max-width: 1120px) {
        margin: 0 10px;
      }
      @media (max-width: 1090px) {
        margin: 0 15px;
      }
      @media (max-width: 768px) {
        margin: 0 0;
      }
    }
  }
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
  @media (max-width: 480px) {
    font-size: 18px;
    margin-top: 5px;
  }
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
  @media (max-width: 1350px) {
    font-size: 44px;
  }
  @media (max-width: 1200px) {
    font-size: 40px;
  }
  @media (max-width: 480px) {
    font-size: 30px;
    line-height: 44px;
  }
`

export const PlaylistAlbumText = styled.div`
  margin-top: 18px;
  font-weight: 700;
  font-size: 21px;
  line-height: 26px;
  letter-spacing: 0.02em;
  color: ${colors.base};
  @media (max-width: 480px) {
    font-size: 18px;
  }
`

export const PlaylistImageCover = styled(PlaylistImage)`
  margin-right: 45px;
`

export const PlaylistBrowseBlockTracks = styled.div`
  min-width: 50%;
  max-width: 50%;
  @media (max-width: 480px) {
    min-width: 85%;
    max-width: 85%;
  }
`

export const PlaylistBrowseBlockSimilarAlbums = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const PlaylistBrowseBlockSimilarAlbumsContent = styled.div`
  display: flex;
  flex-wrap: wrap
`

export const PlaylistContainer = styled(Browse)`
  display: flex;
  align-items: flex-start;
  margin-top: 35px;
  flex-direction: initial;
  @media (max-width: 992px) {
    flex-direction: column;
  }
  @media (max-width: 480px) {
    margin-top: 20px;
  }
`

export const PlaylistAlbumDescription = styled.div`
  margin-top: 6px;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: white;
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`

export const SimilarPlaylist = styled(PlaylistImageCover)`
  max-width: 200px;
  min-width: 200px;
  max-height: 200px;
  min-height: 200px;
`

