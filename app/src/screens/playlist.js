/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {Link, useParams} from 'react-router-dom'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {Browse, PlaylistCover, PlaylistScreen, PlaylistImageCover, PlaylistAlbumArtist, PlaylistAlbumName, PlaylistAlbumTotalTracks, PlaylistAlbumText, PlaylistImage, PlaylistContainer, PlaylistBrowseBlockTracks, PlaylistBrowseBlockSimilarAlbums, PlaylistAlbumDescription, SimilarPlaylist, PlaylistBrowseBlockSimilarAlbumsContent, InterfaceTitle} from 'components/lib'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'components/tracks'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {loadingPlaylists} from 'utils/playlist-fallback'
import {usePlaylistWithRecommendations} from 'utils/playlist'

// http://localhost:3000/playlist/37i9dQZF1DX4JAvHpjipBk solve this
function Playlist() { 
  const {id} = useParams()

  const {
    playlist,
    isPlaylistLoading,
    isPlaylistSuccess,
    isPlaylistError,
    reccommendedPlaylists,
    isReccommendedIdle,
    isReccommendedLoading,
    isReccommendedSuccess,
  } = usePlaylistWithRecommendations(id)

  const setData = (data) => data.reduce((p, n) => p.concat(n.track), [])

  return (
    <PlaylistScreen>
      <PlaylistCover>
        {isPlaylistLoading ? (
          <>
            <PlaylistImageCover
              cover={fallbackSpotify}
              css={{marginTop: 0}}
            />
            <div>
              <PlaylistAlbumText>Playlist</PlaylistAlbumText>
              <PlaylistAlbumName>Loading...</PlaylistAlbumName>
              <PlaylistAlbumDescription>Loading</PlaylistAlbumDescription>
              <PlaylistAlbumTotalTracks>?? tracks</PlaylistAlbumTotalTracks>
            </div>
          </>
        ) : isPlaylistSuccess ? (
        <>
          <PlaylistImageCover
            cover={playlist?.body.images[0].url}
            css={{marginTop: 0}}
          />
          <div>
            <PlaylistAlbumText>Playlist</PlaylistAlbumText>
            <PlaylistAlbumName>{playlist?.body.name}</PlaylistAlbumName>
            <PlaylistAlbumDescription>{playlist?.body.description}</PlaylistAlbumDescription>
            <PlaylistAlbumTotalTracks>{playlist?.body.tracks.total} tracks</PlaylistAlbumTotalTracks>
          </div>
        </>
      ) : null}
      </PlaylistCover>
        <PlaylistContainer>
          <PlaylistBrowseBlockTracks>
            {isPlaylistLoading ? (
              <SpotifyTrackInfoFallback limit={20} />
            ) : isPlaylistSuccess && playlist?.body.tracks.items.length ? (
              <SpotifyTrackDataView data={setData(playlist?.body.tracks.items)} />
            ) : isPlaylistError ? (
            <p>
              Hmmm... I couldn't find any tracks to show for you. Sorry.
            </p>
          ) : null}
          </PlaylistBrowseBlockTracks>
          <PlaylistBrowseBlockSimilarAlbums>
            <InterfaceTitle css={{marginTop: '25px'}}>Similar Albums</InterfaceTitle>
            <PlaylistBrowseBlockSimilarAlbumsContent>
              {isReccommendedLoading || isReccommendedIdle ? (
                <>
                  {loadingPlaylists(4).map(({album}, index) =>
                    <SimilarPlaylist cover={album.images[2].url} key={album.id} />
                  )}
                </>              
              ) : isReccommendedSuccess && reccommendedPlaylists.body.tracks.length ? (
                <>
                  {reccommendedPlaylists.body.tracks.map(({album}) =>
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

export {Playlist}