import { useQuery, useInfiniteQuery } from 'react-query'
import { useAuth } from 'context/auth-context'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import { useQueryClient } from 'react-query'
import { useInView } from 'react-intersection-observer'

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
  const { spotifyApi } = useAuth()

  // {data: searchData, isIdle, isLoading, isSuccess, isLoadingError}

  // And we’ll get all of the same stuff except for run. Because useQuery is gonna manage that for us
  const result = useQuery({
    // 1 - unique identifier 2 - uniqly identify this query 
    queryKey: ['trackSearch', { query }],
    // query function is what I'm pussing to run rn
    queryFn: () => spotifyApi.searchTracks(query, {
      limit: 15
    }),
    // we don't enable fetching data till we have a search query
    enabled: query ? true : false
  })
  // we don't need useEffect anymore so we got rid of it. React query does it instead 

  return { ...result, tracks: result.data ?? loadingTrack }
}

function useSavedTracks() {
  const { spotifyApi } = useAuth()

  const { ref, inView } = useInView({
    rootMargin: '500px'
  })

  const fetchData = async ({ pageParam } = {}) => {
    const limit = pageParam?.limit || 50
    const offset = pageParam?.offset || 0

    return spotifyApi.getMySavedTracks({ limit: limit, offset: offset })
  }

  const result = useInfiniteQuery(
    // queryKey
    'your-album',
    // queryFn 
    fetchData, {
    getNextPageParam: (lastPage) => {
      const limit = 50

      if (lastPage?.body?.next) {
        return {
          limit: limit,
          offset: lastPage.body.offset + limit
        }
      } else return null

    }
  }
  )

  return { ...result, tracks: result.data, ref, inView }
}

function useRecommendedTracks() {
  const { spotifyApi } = useAuth()
  const queryClient = useQueryClient()

  // getting our seeds
  const { data: seedsData, status: seedsStatus } = useQuery({
    queryKey: ['seeds-data'],
    queryFn: () => spotifyApi.getMyTopTracks({ limit: 2 }),
  })

  // console.log('sfdf ', seedsData.body.items[0].id);

  const result = useQuery({
    queryKey: 'recommended-tracks',
    queryFn: () => {
      return spotifyApi.getRecommendations({
        min_energy: 0.4,
        // reduce the data to seeds that we need
        seed_tracks: '0c6xIDDpzE81m2q797ordA',
        min_popularity: 50,
        limit: 10
      })
    },
    enabled: queryClient.getQueriesData(['recommended-tracks'])[0]?.[1] ? false : seedsStatus !== 'success' ? false : true
  })

  return { ...result, recommendedTracks: result.data }
}

export {
  useTracksSearch,
  useSavedTracks,
  useRecommendedTracks
}