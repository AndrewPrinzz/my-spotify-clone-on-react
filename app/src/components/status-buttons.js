/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'

import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {useSpotifyData} from 'utils/hooks'
import {Tooltip} from '@reach/tooltip'
import * as colors from 'styles/colors'
import {useQuery, useMutation, useQueryClient, queryCache, useInfiniteQuery} from 'react-query'

// const Tooltip = () => null

// 🐨 Migrating from react query 2 to react query 3: https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-3

function TooltipButton({onClick, icon}) {
  const {isLoading, isError, errror, run} = useSpotifyData()

  function handleClick() {
    console.log('dsf');
    run(onClick())
  }

  return (
    <Tooltip label="fdfd">
      <div
        onClick={handleClick}
      >
        {isLoading ? 'Loading...' : isError ? 'Error' : icon}
      </div>
    </Tooltip>
  )
}

function StatusButtons({id}) {
  // const listItem = null
  const spotifyApi = useSpotifyWebAPI()

  const queryClient = useQueryClient()
  console.log('queryClient: ', queryClient.queryCache);

  const {data: albumItems} = useQuery({
    queryKey: 'album-items',
    // We have to use the same query key for all of the queries for react query to assosiate these two things together. if we fetch data from one place query function have to be the same. Otherwise we loading different data to the same spot of our cache which would be a very bad confusing thing to happen
    queryFn: () => {
      // we have to to that through getMySavedAlbums to get all of the saved albums data if you sure you want to do that
      return spotifyApi.getMySavedAlbums({limit: 50})
        .then(data => data.body.items)
    },
  })
  
  // We have to check whether or not it exists in our cache and whether is saved or not
  const listItem = albumItems?.reduce((p, n) => p.concat(n.album.id),[]).find(listId => listId === id)
  
  const {mutateAsync: create} = useMutation(
    ({id: trackId}) => {
      // console.log('action: ', action);
      return spotifyApi.addToMySavedAlbums([trackId])
    },
    // we provide invilide queries to find out whether or not this one exists here
    {onSettled: () => queryClient.invalidateQueries('album-items')},
  )
  
  // asyncronius function for mutation
  const {mutateAsync: remove} = useMutation(
    ({id: trackId}) => {
      // console.log('action: ', action);
      return spotifyApi.removeFromMySavedAlbums([trackId])
    },
    // we provide invilide queries to find out whether or not this one exists here
    {onSettled: () => queryClient.invalidateQueries('album-items')},
  )

  return (
    <>
      {listItem ? (
        <TooltipButton
          label="Remove from library"
          icon={"Remove it"}
          onClick={() => remove({id})}
        />
      ) : (
        <TooltipButton 
          label="Add to library"
          icon={"Add it"}
          onClick={() => create({id})}
        />
      )}
    </>
  )
}

export {StatusButtons}