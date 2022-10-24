/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'

import {PlaylistCover, PlaylistScreen, PlaylistImageCover, PlaylistAlbumName, PlaylistAlbumTotalTracks, PlaylistAlbumText, PlaylistContainer, PlaylistBrowseBlockTracks, Browse, PlaylistImageMobile, PlaylistCoverContainer, Spinner} from 'components/lib'
import yourLibraryCover from 'assets/img/spotify/your-library.png'
import {SpotifyTrackInfoFallback, SpotifyTrackDataView} from 'components/tracks'
import {useSavedTracks} from 'utils/tracks'
 
function YourLibrary() {
  const {
    isLoading,
    hasNextPage,
    isSuccess, 
    isLoadingError, 
    fetchNextPage,
    tracks: data,
    inView,
    ref
  } = useSavedTracks()

  const setData = (tracks) => tracks.reduce((p, n) => p.concat(n.track), [])
  

  // track if tracks in view then we load them
  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <PlaylistScreen>
      <PlaylistCover>
        <PlaylistCoverContainer>
          <PlaylistImageCover
            cover={yourLibraryCover}
            css={{marginTop: 0}}
          />
          <PlaylistImageMobile
            css={{marginTop: '0!important'}}
            src={yourLibraryCover}
          /> 
          <div>
            <PlaylistAlbumText>Playlist</PlaylistAlbumText>
            <PlaylistAlbumName>Your Library</PlaylistAlbumName>
            {/* <PlaylistAlbumDescription>Loading</PlaylistAlbumDescription> */}
            {isLoading ? (
              <PlaylistAlbumTotalTracks>?? tracks</PlaylistAlbumTotalTracks>
            ) : isSuccess ? (
              <PlaylistAlbumTotalTracks>{data.pages[0].body.total} tracks</PlaylistAlbumTotalTracks>
            ) : null}
          </div>
        </PlaylistCoverContainer>
      </PlaylistCover>
      <PlaylistContainer>
        <PlaylistBrowseBlockTracks>
          {isLoading ? (
            <SpotifyTrackInfoFallback limit={20} />
          ) : isSuccess ? (
            <>
              {/* <SpotifyTrackDataView data={setData(tracks.body.items)} /> */}
              {data.pages.map((item, index) => 
                <SpotifyTrackDataView key={item.body.offset} data={setData(item.body.items)} /> 
              )}
              {hasNextPage && 
                <div css={{marginTop: '20px'}} ref={ref}>
                  <Spinner />
                </div>
              }              
            </>
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