import React from 'react'
import {useQuery, useQueryClient} from 'react-query'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'

function useAlbums() {
  const spotifyApi = useSpotifyWebAPI()

  const result = useQuery({
    queryKey: 'album-items',
    // We have to use the same query key for all of the queries for react query to assosiate these two things together. if we fetch data from one place query function have to be the same. Otherwise we loading different data to the same spot of our cache which would be a very bad confusing thing to happen
    queryFn: () => {
      // we have to to that through getMySavedAlbums to get all of the saved albums data if you sure you want to do that
      return spotifyApi.getMySavedAlbums({limit: 50})
        .then(playlistData => playlistData.body.items)
    },
  })
  
  return {...result, albums: result.data}
}

function useAlbumWithRecommendations(id) {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()

  const album = useQuery({
    queryKey: ['album', {id}],
    queryFn: () => spotifyApi.getAlbum(id)
  })

  const recommendedAlbums = useQuery({
    queryKey: ['recommended-album', { id }],
    queryFn: () => {
      const seeds = album.data.body.tracks.items.reduce((prevValue, nextValue) =>
        prevValue.concat(nextValue.id)
        , [])
      return spotifyApi.getRecommendations({
        min_energy: 0.4,
        // reduce the data to seeds that we need
        seed_tracks: seeds.slice(0, 2),
        min_popularity: 50,
        limit: 4
      })
    },
    enabled: queryClient.getQueriesData(['recommended-album', { id }])[0]?.[1] ? false : album.isSuccess ? true : false
  })

  return {
    album: album.data,
    isAlbumLoading: album.isLoading,
    isAlbumSuccess: album.isSuccess,
    isAlbumError: album.isError,
    reccommendedAlbums: recommendedAlbums.data,
    isReccommendedIdle: recommendedAlbums.isIdle,
    isReccommendedLoading: recommendedAlbums.isLoading,
    isReccommendedSuccess: recommendedAlbums.isSuccess,
  }
}

export {
  useAlbums,
  useAlbumWithRecommendations
}
