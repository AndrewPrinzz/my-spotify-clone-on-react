/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'
import {useUserData} from 'context/user-data-context'
import {useSpotifyData} from 'utils/hooks'

import {Browse, PlaylistCover, PlaylistScreen, PlaylistImageCover, PlaylistAlbumArtist, PlaylistAlbumName, PlaylistAlbumTotalTracks, PlaylistAlbumText, PlaylistImage, PlaylistContainer, PlaylistBrowseBlockTracks, PlaylistBrowseBlockSimilarAlbums, PlaylistAlbumDescription, SimilarPlaylist, PlaylistBrowseBlockSimilarAlbumsContent, InterfaceTitle} from 'components/lib'
import yourLibraryCover from 'assets/img/spotify/your-library.png'
import {useAccessToken} from 'context/auth-context'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {SpotifyTrackInfoFallback, SpotifyTrackDataView} from 'utils/tracks'

function YourLibrary() {
  const [accessToken] = useAccessToken()
  const spotifyWebApi = useSpotifyWebAPI()

  const {status, data, error, run, isLoading, isSuccess, isError} = useSpotifyData({
    status: 'pending',
  })

  React.useEffect(() => {
    if (!accessToken) return

    run(spotifyWebApi.getMySavedTracks({
      limit: 50
    }))
  }, [accessToken])

  function setData(theData) {
    return theData.reduce((prevValue, nextValue) => prevValue.concat(nextValue.track), [])
  }

  return (
    <PlaylistScreen>
      <PlaylistCover>
        <>
          <PlaylistImageCover
            cover={yourLibraryCover}
            css={{ marginTop: 0 }}
          />
          <div>
            <PlaylistAlbumText>Playlist</PlaylistAlbumText>
            <PlaylistAlbumName>Your Library</PlaylistAlbumName>
            {/* <PlaylistAlbumDescription>Loading</PlaylistAlbumDescription> */}
            {isLoading ? (
              <PlaylistAlbumTotalTracks>?? tracks</PlaylistAlbumTotalTracks>
            ) : isSuccess ? (
              <PlaylistAlbumTotalTracks>{data.body.total} tracks</PlaylistAlbumTotalTracks>
            ) : null}
          </div>
        </>
      </PlaylistCover>
      <PlaylistContainer>
        <PlaylistBrowseBlockTracks>
          {isLoading ? (
            <SpotifyTrackInfoFallback limit={20} />
          ) : isSuccess && data.body.items.length ? (
            <SpotifyTrackDataView data={setData(data.body.items)} />
          ) : isError ? (
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