/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import { Link, useParams} from 'react-router-dom'
import {Browse, PlaylistCover, PlaylistScreen, PlaylistImageCover, PlaylistAlbumArtist, PlaylistAlbumName, PlaylistAlbumTotalTracks, PlaylistAlbumText, PlaylistImage, PlaylistContainer, PlaylistBrowseBlockTracks, PlaylistBrowseBlockSimilarAlbums, PlaylistAlbumDescription, SimilarPlaylist, PlaylistBrowseBlockSimilarAlbumsContent, InterfaceTitle} from 'components/lib'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'components/tracks'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {loadingPlaylists} from 'utils/playlist-fallback'
import {StatusButtons} from 'components/status-buttons'
import {useAlbumWithRecommendations} from 'utils/album'

function Album() {
  const {id} = useParams()

  const {
    album,
    isAlbumLoading,
    isAlbumSuccess,
    isAlbumError,
    reccommendedAlbums,
    isReccommendedIdle,
    isReccommendedLoading,
    isReccommendedSuccess,
  } = useAlbumWithRecommendations(id)

  const setData = ({images, artists, ...data}) => 
    data.tracks.items.reduce((p, n) => p.concat({...n, album: {images, artists}}), [])

  return (
    <PlaylistScreen>
      <PlaylistCover>
        {isAlbumLoading ? (
          <>
            <PlaylistImageCover
              cover={fallbackSpotify}
              css={{ marginTop: 0 }}
            />
            <PlaylistBrowseBlockSimilarAlbumsContent>
              <PlaylistAlbumText>Album</PlaylistAlbumText>
              <PlaylistAlbumName>Loading...</PlaylistAlbumName>
              <PlaylistAlbumDescription>Loading</PlaylistAlbumDescription>
              <PlaylistAlbumTotalTracks>?? tracks</PlaylistAlbumTotalTracks>
            </PlaylistBrowseBlockSimilarAlbumsContent>
          </>
        ) : isAlbumSuccess ? (
          <>
            <PlaylistImageCover
              cover={album.body.images[0].url}
              css={{marginTop: 0}}
            />
            <div>
              <PlaylistAlbumText>Album</PlaylistAlbumText>
              <PlaylistAlbumName>{album.body.name}</PlaylistAlbumName>
              <PlaylistAlbumDescription>{album.body.description}</PlaylistAlbumDescription>
              <PlaylistAlbumTotalTracks>{album.body.tracks.total} tracks</PlaylistAlbumTotalTracks>
            </div>
          </>
        ) : null}
      </PlaylistCover>
      <PlaylistContainer>
        <PlaylistBrowseBlockTracks>
        {/* Status Buttons */}
        <StatusButtons id={id} />
        {/* Status Buttons */}
          {isAlbumLoading ? (
            <SpotifyTrackInfoFallback limit={20} />
          ) : isAlbumSuccess && album.body.tracks.items.length ? (
            <SpotifyTrackDataView data={setData(album.body)} />
          ) : isAlbumError ? (
            <p>
              Hmmm... I couldn't find any tracks to show for you. Sorry.
            </p>
          ) : null}
        </PlaylistBrowseBlockTracks>
        <PlaylistBrowseBlockSimilarAlbums>
          <InterfaceTitle css={{marginTop: '25px'}}>Similar Albums</InterfaceTitle>
          <Link to={'/album/5JpH5T1sCYnUyZD6TM0QaY'}>Link</Link>
          <PlaylistBrowseBlockSimilarAlbumsContent>
            {isReccommendedLoading || isReccommendedIdle ? (
              <>
                {loadingPlaylists(4).map(({ album }, index) =>
                  <SimilarPlaylist cover={album.images[2].url} key={album.id} />
                )}
              </>
            ) : isReccommendedSuccess && reccommendedAlbums.body.tracks.length ? (
              <>
                {reccommendedAlbums.body.tracks.map(({ album }) =>
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