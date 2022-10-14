/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import {Browse, Greeting} from 'components/lib'
import {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView,
} from 'components/playlists'
import {useAlbumItems} from 'utils/album'

function YourAlbums() {
  const {albums, isLoading, isSuccess} = useAlbumItems()
  
  const setData = (albums) => albums.reduce((p, n) => p.concat([n.album]), [])

  return (
    <Browse>
      <Greeting css={{width: '100%'}}>Your Albums</Greeting>
      <div css={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'initial'
      }}>
        {isLoading ? (
          <SpotifyPlaylistInfoFallback />
        ) : isSuccess && albums.length ? (
          <>
            <SpotifyPlaylistDataView data={setData(albums)} />
          </>
        ) : isSuccess && !albums.length ? (
          <span>
            Hmmm... I couldn't find any albums to show for you. Sorry. Maybe you haven't saved anything yet?
          </span>
        ) : null}
      </div>
    </Browse>
  )
}

export {YourAlbums}