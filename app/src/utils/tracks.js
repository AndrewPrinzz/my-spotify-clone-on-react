import React from 'react'
import {useQuery} from 'react-query'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {useQueryClient} from 'react-query'
import { useAccessToken } from 'context/auth-context'

const loadingTrack = {
  album: {
    artists: [
      {
        "name": "Loading..."
      }
    ],
    images: [
      {
        height: 640,
        url: fallbackSpotify,
        width: 640,
      },
      {
        height: 300,
        url: fallbackSpotify,
        width: 300
      },
      {
        height: 64,
        url: fallbackSpotify,
        width: 64,
      },
    ]
  },
  name: 'Loading...',
  uri: false
}

// specify preview of loading tracks
const loadingTracks = (length) => Array.from({ length: length }, (v, index) => ({
  id: `loading-track-${index}`,
  ...loadingTrack
}))

function useTracksSearch(query) {
  const spotifyApi = useSpotifyWebAPI()
  
  // {data: searchData, isIdle, isLoading, isSuccess, isLoadingError}

  // And we’ll get all of the same stuff except for run. Because useQuery is gonna manage that for us
    const result = useQuery({
      // 1 - unique identifier 2 - uniqly identify this query 
      queryKey: ['trackSearch', {query}],
      // query function is what I'm pussing to run rn
      queryFn: () => spotifyApi.searchTracks(query, {
        limit: 15
      }),
      // we don't enable fetching data till we have a search query
      enabled: query ? true : false
    })
    // we don't need useEffect anymore so we got rid of it. React query does it instead 

    return {...result, tracks: result.data ?? loadingTrack}
}

function useSavedTracks() {
  const spotifyWebApi = useSpotifyWebAPI()

  const result = useQuery({
    queryKey: 'your-album',
    queryFn: () => spotifyWebApi.getMySavedTracks({limit: 50})
  })

  return {...result, tracks: result.data}
}

function useRecommendedTracks() {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()
  const accessToken = useAccessToken()

  // getting our seeds
  const {data: seedsData, status: seedsStatus} = useQuery({
    queryKey: ['seeds-data', accessToken],
    queryFn: () => spotifyApi.getMyTopTracks({limit: 2}),
    enabled: !!accessToken
  })

  const result = useQuery({
    queryKey: 'recommended-tracks',
    queryFn: () => {
      return spotifyApi.getRecommendations({
        min_energy: 0.4,
        // reduce the data to seeds that we need
        seed_tracks: seedsData.body.items.reduce(
          (prevValue, currentValue) =>
            prevValue.concat(currentValue.id),
          []
        ),
        min_popularity: 50,
        limit: 10
      })
    },
    enabled: queryClient.getQueriesData(['recommended-tracks'])[0]?.[1] ? false : seedsStatus !== 'success' ? false : true
  })

  return {...result, recommendedTracks: result.data}
}

export {
  useTracksSearch,
  useSavedTracks,
  useRecommendedTracks
}