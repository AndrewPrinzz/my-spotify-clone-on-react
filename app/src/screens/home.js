/** @jsxImportSource @emotion/react */
import {jsx}  from '@emotion/react'

import React from 'react'
import {Greeting, PlayListItems,ChartBlock, ChartBlocks, InterfaceDspr, InterfaceTitle, MusicResults} from 'components/lib'
import {ChartTrackTemplate} from 'components/chart'
import {chart} from 'test/chart-data'
import {Browse} from 'components/lib'
import {useSpotifyData, useSpotifyData2, useLocalStorageState} from 'utils/hooks'
import {ErrorBoundary} from 'react-error-boundary'
import {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView,
} from 'spotify'
import {ErrorMessage} from 'components/error-fallbacks'
import {useAccessToken} from 'context/auth-context'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'


function SpotifyPlaylistInfo() {
  const [accessToken] = useAccessToken()
  
  const spotifyApi = useSpotifyWebAPI()

  const {status, data, error, run} = useSpotifyData2({
    status: 'pending',
    // delay: 3000
  })
  
  const endpointData = {
    limit: 4,
    country: 'US',
    locale: 'en_US',
  }

  React.useEffect(() => {
    if (!accessToken) {
      return
    }
    spotifyApi.setAccessToken(accessToken)
    run(spotifyApi.getFeaturedPlaylists(endpointData))
  }, [accessToken, run])

  if (status === 'pending') {
    return <SpotifyPlaylistInfoFallback data={endpointData} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <SpotifyPlaylistDataView data={data.body.playlists.items} />
  }
  
  throw new Error('This should be impossible')
}

function Home() {
  const [accessToken] = useLocalStorageState('__auth_provider_access_token__')

  React.useEffect(() => {
    if (!accessToken) return
  }, [accessToken])
  return (
    <Browse>
      {/* Playlists */}
      <Greeting>Good Evening</Greeting>
      <PlayListItems>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <SpotifyPlaylistInfo />
        </ErrorBoundary>
      </PlayListItems>
      {/* Chart */}
      <InterfaceTitle>Smoothly releases</InterfaceTitle>
      <InterfaceDspr>New releases on Smoothly</InterfaceDspr>
      <ChartBlocks>
        <ChartBlock>
          {chart.slice(0, 5).map(({id, ...props}) => (
            <ChartTrackTemplate key={id} {...props} />
          ))}
        </ChartBlock>
        <ChartBlock>
          {chart.slice(5, 10).map(({id, ...props}) => (
            <ChartTrackTemplate key={id} {...props} />
          ))}
        </ChartBlock>
      </ChartBlocks>
      {/* Recently Played */}
      {/* <RecentlyPlayed /> */}
    </Browse>
  )
}

export {Home}