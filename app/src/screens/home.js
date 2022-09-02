/** @jsxImportSource @emotion/react */
import {jsx}  from '@emotion/react'

import React from 'react'
import {Greeting, PlayListItems, RecommendedBlock, RecommendedBlocks, InterfaceDspr, InterfaceTitle, MusicResults, TrackItems} from 'components/lib'
import {Browse} from 'components/lib'
import {
  useSpotifyData,
  useLocalStorageState, 
  // useGetUsersSeeds
} from 'utils/hooks'
import {ErrorBoundary} from 'react-error-boundary'
import {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView,
} from 'utils/playlists'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'utils/tracks'
import {ErrorMessage} from 'components/error-fallbacks'
import {useAccessToken} from 'context/auth-context'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'

function SpotifyRecommendations() {
  const [accessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  // getting our seeds
  const {data: seedsData, status: seedsStatus, error: seedsError, run: seedsRun} = useSpotifyData({
    status: 'pending',
  })
  // getting our data
  const {status, run, data, error} = useSpotifyData({
    status: 'pending'
  })
  
  React.useEffect(() => {
    if (!accessToken) return
    // getting seeds for top tracks
    seedsRun(spotifyApi.getMyTopTracks({limit: 5}))
  }, [accessToken, seedsRun])

  React.useEffect(() => {
    // make sure we got seeds
    if (seedsStatus !== 'resolved') return
    
    run(spotifyApi.getRecommendations({
      min_energy: 0.4,
      // reduce the data to seeds that we need
      seed_artists: seedsData.body.items.reduce(
        (prevValue, currentValue) =>
          prevValue.concat(currentValue.album.artists[0].id),
        []
      ),
      min_popularity: 50,
      limit: 10
    }))
  }, [seedsStatus, run])
  
  if (status === 'pending') {
    return (
      <SpotifyTrackInfoFallback />
    )
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return (
      <SpotifyTrackDataView data={data.body.tracks} />
    )
  }

  throw new Error('This should be impossible')
}

function SpotifyPlaylistInfo() {
  const [accessToken] = useAccessToken()
  
  const spotifyApi = useSpotifyWebAPI()

  const {status, data, error, run} = useSpotifyData({
    status: 'pending',
    // delay: 3000
  })
  
  const endpointData = {
    limit: 3,
    country: 'US',
    locale: 'en_US',
  }

  React.useEffect(() => {
    if (!accessToken) {
      return
    }
    
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
      {/*  */}
      <InterfaceTitle>You might like</InterfaceTitle>
      <InterfaceDspr>Music based on what you like</InterfaceDspr>
      <TrackItems>
        <SpotifyRecommendations />
      </TrackItems>
      {/* Recently Played */}
      {/* <RecentlyPlayed /> */}
    </Browse>
  )
}

export {Home}