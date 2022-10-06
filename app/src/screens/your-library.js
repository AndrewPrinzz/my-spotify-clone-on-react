/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {PlaylistCover, PlaylistScreen, PlaylistImageCover, PlaylistAlbumName, PlaylistAlbumTotalTracks, PlaylistAlbumText, PlaylistContainer, PlaylistBrowseBlockTracks} from 'components/lib'
import yourLibraryCover from 'assets/img/spotify/your-library.png'
import {SpotifyTrackInfoFallback, SpotifyTrackDataView} from 'components/tracks'
import {useSavedTracks} from 'utils/tracks'

function YourLibrary() {
  const {isLoading, isSuccess, isLoadingError, tracks} = useSavedTracks()

  const setData = (tracks) => tracks.reduce((p, n) => p.concat(n.track), [])

  return (
    <PlaylistScreen>
      <PlaylistCover>
        <>
          <PlaylistImageCover
            cover={yourLibraryCover}
            css={{marginTop: 0}}
          />
          <div>
            <PlaylistAlbumText>Playlist</PlaylistAlbumText>
            <PlaylistAlbumName>Your Library</PlaylistAlbumName>
            {/* <PlaylistAlbumDescription>Loading</PlaylistAlbumDescription> */}
            {isLoading ? (
              <PlaylistAlbumTotalTracks>?? tracks</PlaylistAlbumTotalTracks>
            ) : isSuccess ? (
              <PlaylistAlbumTotalTracks>{tracks.body.total} tracks</PlaylistAlbumTotalTracks>
            ) : null}
          </div>
        </>
      </PlaylistCover>
      <PlaylistContainer>
        <PlaylistBrowseBlockTracks>
          {isLoading ? (
            <SpotifyTrackInfoFallback limit={20} />
          ) : isSuccess && tracks.body.items.length ? (
            <SpotifyTrackDataView data={setData(tracks.body.items)} />
            ) : isLoadingError ? (
            <p>
              Hmmm... I couldn't find any tracks to show for you. Sorry.
            </p>
          ) : null}
        </PlaylistBrowseBlockTracks>
      </PlaylistContainer>
    </PlaylistScreen>
  )
}

export {YourLibrary}