import {useQuery, useQueryClient} from 'react-query'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'

function useTopPlaylists() {
  const spotifyApi = useSpotifyWebAPI()

  const result = useQuery({
    queryKey: 'top-playlists',
    queryFn: () => spotifyApi.getFeaturedPlaylists({limit: 3,  country: 'US', locale: 'en_US'})
  })

  return {...result, playlists: result.data}
}

function usePlaylistWithRecommendations(id) {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()

  const playlist = useQuery({
    queryKey: ['playlist', {id}],
    queryFn: () => spotifyApi.getPlaylist(id)
  })
  console.log('playlist: ', playlist);

  const recommendedPlaylists = useQuery({
    queryKey: ['recommended-playlist', {id}],
    queryFn: () => {
        const seeds = playlist?.data?.body.tracks.items.reduce((prevValue, nextValue) =>
          prevValue.concat(nextValue.track?.id)
        , [])
        return spotifyApi.getRecommendations({
          min_energy: 0.4,
          // reduce the data to seeds that we need
          seed_tracks: seeds.slice(0, 2),
          min_popularity: 50,
          limit: 4
        })
    },
    enabled: queryClient.getQueriesData(['recommended-playlist', {id}])[0]?.[1] ? false : playlist.isSuccess ? true : false
  })

  return {
    playlist: playlist?.data,
    isPlaylistLoading: playlist?.isLoading,
    isPlaylistSuccess: playlist?.isSuccess,
    isPlaylistError: playlist?.isError,
    reccommendedPlaylists: recommendedPlaylists?.data,
    isReccommendedIdle: recommendedPlaylists?.isIdle,
    isReccommendedLoading: recommendedPlaylists?.isLoading,
    isReccommendedSuccess: recommendedPlaylists?.isSuccess,
  }
}


export {
  useTopPlaylists,
  usePlaylistWithRecommendations
}