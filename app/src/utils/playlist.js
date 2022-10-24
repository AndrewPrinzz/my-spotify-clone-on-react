import {useQuery, useQueryClient} from 'react-query'
import {useAuth} from 'context/auth-context'

const getPlaylistItemsConfig = (queryClient, spotifyApi, options) => ({
  queryKey: 'top-playlists',
  // We have to use the same query key for all of the queries for react query to assosiate these two things together. if we fetch data from one place query function have to be the same. Otherwise we loading different data to the same spot of our cache which would be a very bad confusing thing to happen
  queryFn: () => {
    // we have to to that through getMySavedAlbums to get all of the saved albums data if you sure you want to do that
    return spotifyApi.getFeaturedPlaylists({limit: 3,  country: 'US', locale: 'en_US'})
  },
})

function useTopPlaylists(options = {}) {
  const {spotifyApi} = useAuth()
  const queryClient = useQueryClient()

  const result = useQuery(getPlaylistItemsConfig(queryClient, spotifyApi, options))

  return {...result, playlists: result.data}
}

function usePlaylist(id) {
  const {spotifyApi} = useAuth()

  const result = useQuery({
    queryKey: ['playlist', {id}],
    queryFn: () => spotifyApi.getPlaylist(id)
  })

  return {...result, playlist: result.data}
}

function usePlaylistWithRecommendations(id) {
  const {spotifyApi} = useAuth()
  const queryClient = useQueryClient()
  const playlist = usePlaylist(id)
  
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
    enabled: queryClient.getQueriesData(['recommended-playlist', {id}])[0]?.[1] ? false : playlist.isSuccess ? true : false,
    // onSuccess
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

function setQueryDataForPlaylist(queryClient, playlist) {
  // we set id to album like this `queryKey: ['album', {id}]` which means that we set our id like this: `queryKey: ['album', {id: id}]`.That means that we also have to set id the same way `id: album.id`
  queryClient.setQueryData(['playlist', {id: playlist.id}], {body: playlist})
}


export {
  useTopPlaylists,
  usePlaylistWithRecommendations,
  usePlaylist
}