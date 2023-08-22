/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import { Greeting, PlayListItems, InterfaceDspr, InterfaceTitle, TrackItems, FullPageSpinner } from 'components/lib'
import { Browse } from 'components/lib'
import { ErrorBoundary } from 'react-error-boundary'
import {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView,
} from 'components/playlists'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'components/tracks'
import { ErrorMessage } from 'components/error-fallbacks'
import { timeGreeting } from 'components/time-greeting'
import { useTopPlaylists } from 'utils/playlist'
import { useRecommendedTracks } from 'utils/tracks'

function SpotifyRecommendations() {
  const { isSuccess, isLoading, isIdle, isError, recommendedTracks, error } = useRecommendedTracks()
  console.log('recommendedTracks: ', recommendedTracks);

  if (isLoading || isIdle) {
    return <SpotifyTrackInfoFallback />
  } else if (isError) {
    throw error
  } else if (isSuccess) {
    return <SpotifyTrackDataView data={recommendedTracks.body.tracks} />
  }

  throw new Error('This should be impossible')
}

function SpotifyPlaylistInfo() {
  const { playlists, error, isLoading, isError, isSuccess } = useTopPlaylists()
  console.log('playlists: ', playlists);

  if (isLoading) {
    return <SpotifyPlaylistInfoFallback data={{ limit: 3 }} />
  } else if (isError) {
    throw error
  } else if (isSuccess) {
    return <SpotifyPlaylistDataView data={playlists.body.playlists.items} />
  }

  throw new Error('This should be impossible')
}

function Home() {

  return (
    <Browse>
      <Greeting css={{
        margin: 0,
        '@media (max-width: 768px)': {
          marginTop: '-8px'
        }
      }}>{timeGreeting}</Greeting>
      <PlayListItems>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <SpotifyPlaylistInfo />
        </ErrorBoundary>
      </PlayListItems>
      {/*  */}
      <InterfaceTitle>You might like</InterfaceTitle>
      <InterfaceDspr>Music based on what you like</InterfaceDspr>
      <TrackItems>
        <SpotifyRecommendations />
      </TrackItems>
    </Browse>
  )
}

export { Home }