/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {useSpotifyData} from 'utils/hooks'
import {Tooltip} from '@reach/tooltip'
import {useAddAlbum, useAlbumItem, useRemoveAlbum} from 'utils/album'
import {LikeIcon} from 'components/icons'
import * as colors from 'styles/colors'

// 🐨 Migrating from react query 2 to react query 3: https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-3

function TooltipButton({onClick, icon}) {
  const {isLoading, isError, run} = useSpotifyData()

  function handleClick() {
    run(onClick())
  }

  return (
    <div css={{
      marginTop: '20px',
      transform: 'translateX(-10px)',
      display: 'flex',
      cursor: 'pointer',
      width: 'max-content'
    }}>
      <Tooltip label="Like Button">
        <div
          onClick={handleClick}
        >
          {isLoading ? <LikeIcon /> : isError ? 'There was an error. Try refreshing the page' : icon}
        </div>
      </Tooltip>
    </div>
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
          icon={<LikeIcon fill={colors.burgundy} />}
          onClick={() => handleRemoveClick({id})}
        />
      ) : (
        <TooltipButton 
          label="Add to library"
          icon={<LikeIcon />}
          onClick={() => handleAddClick({id})}
        />
      )}
    </>
  )
}

export {StatusButtons}