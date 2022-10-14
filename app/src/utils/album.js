import React from 'react'
import {useQuery, useQueryClient, useMutation} from 'react-query'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'

const getAlbumItemsConfig = (queryClient, spotifyApi, options) => ({
  queryKey: 'album-items',
  // We have to use the same query key for all of the queries for react query to assosiate these two things together. if we fetch data from one place query function have to be the same. Otherwise we loading different data to the same spot of our cache which would be a very bad confusing thing to happen
  queryFn: () => {
    // we have to to that through getMySavedAlbums to get all of the saved albums data if you sure you want to do that
    return spotifyApi.getMySavedAlbums({limit: 50})
      .then(playlistData => playlistData.body.items)
  },
  onSuccess(albums) {
    for (const {album} of albums) {
      // We added a config option for onSuccess for this `setQueryDataForAlbum` which applies to our `useAlbum`. And so when that is successful we iterate through all of the albums we've got and set the query data for the album. So that when we use this queryKey we have that in the cache already 
      setQueryDataForAlbum(queryClient, album)
    }
  }
})

function useAlbumItems(options = {}) {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()

  const result = useQuery(getAlbumItemsConfig(queryClient, spotifyApi, options))
  
  return {...result, albums: result.data} ?? []
}

function useAlbum(id, options = {}) {
  const spotifyApi = useSpotifyWebAPI()

  const result = useQuery({
    queryKey: ['album', {id}],
    queryFn: () => spotifyApi.getAlbum(id)
  })

  return {...result, album: result.data}
}

function useAlbumWithRecommendations(id, options = {}) {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()

  const album = useAlbum(id, options)

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

function useAlbumItem(id, options = {}) {
  const {data: albumItems} = useAlbumItems(options)
  return albumItems?.reduce((p, n) => p.concat(n.album.id),[]).find(listId => listId === id)
}

function useAddAlbum(id, album, options = {}) {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()
  
  return useMutation(
    () => spotifyApi.addToMySavedAlbums([id]), {
      onMutate(addedItem) {
      const previousItems = queryClient.getQueryData('album-items')
      const date = new Date().toISOString().split('.')[0] + 'Z'
      
      // this action will add a specific album in your albums page immediately
      queryClient.setQueryData('album-items', [{added_at: date, album: album.body}, ...previousItems])
    },
    // we provide invilide queries to find out whether or not this one exists here
    onSettled: () => queryClient.invalidateQueries('album-items'),
    ...options
  })
}

function useRemoveAlbum(id, options = {}) {
  const spotifyApi = useSpotifyWebAPI()
  const queryClient = useQueryClient()
  
  return useMutation(
    () => spotifyApi.removeFromMySavedAlbums([id]), {
      onMutate(removedItem) {
        const previousItems = queryClient.getQueryData('album-items')
        
        // this action will remove a specific album in your albums page immediately
        queryClient.setQueryData('album-items', previousItems.filter(item => item.album.id !== removedItem.id))
      },
      // we provide invilide queries to find out whether or not this one exists here
      onSettled: () => queryClient.invalidateQueries('album-items'),
      ...options
    })
}

function setQueryDataForAlbum(queryClient, album) {
  // we set id to album like this `queryKey: ['album', {id}]` which means that we set our id like this: `queryKey: ['album', {id: id}]`.That means that we also have to set id the same way `id: album.id`
  queryClient.setQueryData(['album', {id: album.id}], {body: album} )
}

export {
  useAlbum,
  useAlbumItems,
  useAlbumItem,
  useAddAlbum,
  useRemoveAlbum,
  useAlbumWithRecommendations
}
