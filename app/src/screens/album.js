/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import {useSpotifyData} from 'utils/hooks'
import {useAccessToken} from 'context/auth-context'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {Browse, PlaylistCover, PlaylistScreen, PlaylistImageCover, PlaylistAlbumArtist, PlaylistAlbumName, PlaylistAlbumTotalTracks, PlaylistAlbumText, PlaylistImage, PlaylistContainer, PlaylistBrowseBlockTracks, PlaylistBrowseBlockSimilarAlbums, PlaylistAlbumDescription, SimilarPlaylist, PlaylistBrowseBlockSimilarAlbumsContent, InterfaceTitle} from 'components/lib'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'utils/tracks'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {loadingPlaylists} from 'utils/playlist'



function Album() {
  const {id} = useParams()

  const [accessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  const {isLoading, isSuccess, isError, status, data, run} = useSpotifyData({
    status: 'pending',
  })

  const {data: similarPlaylistData, status: similarPlaylistStatus, error: similarPlaylistError, run: similarPlaylistRun, isLoading: isSimilarPlaylistLoading, isSuccess: isSimilarPlaylistSuccess} = useSpotifyData({
    status: 'pending'
  })

  React.useEffect(() => {
    if (!accessToken) {
      return
    }

    run(spotifyApi.getAlbum(id))
  }, [accessToken, run, id])

  React.useEffect(() => {
    if (status !== 'resolved' || !accessToken) return
    
    const seeds = data.body.tracks.items.reduce((prevValue, nextValue) =>
    prevValue.concat(nextValue.id)
    , [])

    similarPlaylistRun(spotifyApi.getRecommendations({
      min_energy: 0.4,
      // reduce the data to seeds that we need
      seed_tracks: seeds.slice(0, 2),
      min_popularity: 50,
      limit: 4
    }))
    
  }, [status, data, similarPlaylistRun, useSpotifyData])
  
  // console.log('similarPlaylistStatus ', similarPlaylistStatus);

  function setData(theData) {
    const {images, artists} = theData

    console.log('the data ', theData)

    return theData.tracks.items.reduce((prevValue, nextValue) => 
      prevValue.concat({
        ...nextValue, album: {images, artists}
      })
    , [])
    
  }

  return (
    <PlaylistScreen>
      <PlaylistCover>
        {isLoading ? (
          <>
            <PlaylistImageCover
              cover={fallbackSpotify}
              css={{ marginTop: 0 }}
            />
            <PlaylistBrowseBlockSimilarAlbumsContent>
              <PlaylistAlbumText>Playlist</PlaylistAlbumText>
              <PlaylistAlbumName>Loading...</PlaylistAlbumName>
              <PlaylistAlbumDescription>Loading</PlaylistAlbumDescription>
              <PlaylistAlbumTotalTracks>?? tracks</PlaylistAlbumTotalTracks>
            </PlaylistBrowseBlockSimilarAlbumsContent>
          </>
        ) : isSuccess ? (
          <>
            <PlaylistImageCover
              cover={data.body.images[0].url}
              css={{ marginTop: 0 }}
            />
            <div>
              <PlaylistAlbumText>Playlist</PlaylistAlbumText>
              <PlaylistAlbumName>{data.body.name}</PlaylistAlbumName>
              <PlaylistAlbumDescription>{data.body.description}</PlaylistAlbumDescription>
              <PlaylistAlbumTotalTracks>{data.body.tracks.total} tracks</PlaylistAlbumTotalTracks>
            </div>
          </>
        ) : null}
      </PlaylistCover>
      <PlaylistContainer>
        <PlaylistBrowseBlockTracks>
          {isLoading ? (
            <SpotifyTrackInfoFallback limit={20} />
          ) : isSuccess && data.body.tracks.items.length ? (
            <SpotifyTrackDataView data={setData(data.body)} />
          ) : isError ? (
            <p>
              Hmmm... I couldn't find any tracks to show for you. Sorry.
            </p>
          ) : null}
        </PlaylistBrowseBlockTracks>
        <PlaylistBrowseBlockSimilarAlbums>
          <InterfaceTitle css={{marginTop: '25px'}}>Similar Albums</InterfaceTitle>
          <PlaylistBrowseBlockSimilarAlbumsContent>
            {isSimilarPlaylistLoading ? (
              <>
                {loadingPlaylists(4).map(({ album }, index) =>
                  <SimilarPlaylist cover={album.images[2].url} key={album.id} />
                )}
              </>
            ) : isSimilarPlaylistSuccess && similarPlaylistData.body.tracks.length ? (
              <>
                {similarPlaylistData.body.tracks.map(({ album }) =>
                  <Link to={`/album/${album.id}`} key={album.id}>
                    <SimilarPlaylist cover={album.images[1].url} />
                  </Link>
                )}
              </>
            ) : `Sorry, there's no similar albums here. Seems like this one is unique? :)`}
          </PlaylistBrowseBlockSimilarAlbumsContent>
        </PlaylistBrowseBlockSimilarAlbums>
      </PlaylistContainer>
    </PlaylistScreen>
  )
}

export {Album}