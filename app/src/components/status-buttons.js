/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {useSpotifyData} from 'utils/hooks'
import {Tooltip} from '@reach/tooltip'
import {useAddAlbum, useAlbumItem, useRemoveAlbum} from 'utils/album'

// 🐨 Migrating from react query 2 to react query 3: https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-3

function TooltipButton({onClick, icon}) {
  const {isLoading, isError, error, run} = useSpotifyData()

  function handleClick() {
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

function StatusButtons({id, album}) {
  const albumItem = useAlbumItem(id)
  
  // asyncronius function for mutation
  const {mutateAsync: handleAddClick} = useAddAlbum(id, album)
  const {mutateAsync: handleRemoveClick} = useRemoveAlbum(id)

  return (
    <>
      {albumItem ? (
        <TooltipButton
          label="Remove from library"
          icon={"Remove it"}
          onClick={() => handleRemoveClick({id})}
        />
      ) : (
        <TooltipButton 
          label="Add to library"
          icon={"Add it"}
          onClick={() => handleAddClick({id})}
        />
      )}
    </>
  )
}

export {StatusButtons}