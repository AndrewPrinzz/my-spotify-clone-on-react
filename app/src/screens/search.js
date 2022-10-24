/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import React from 'react'

import {
  SearchForm
} from 'components/playlists'
import {Browse} from 'components/lib'

import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'components/tracks'
import {useSearchQuery} from 'context/search-query-context'
import {useTracksSearch} from 'utils/tracks'
import * as colors from 'styles/colors'

function Search() {
  const [query, setQuery] = useSearchQuery()

  const {tracks, isIdle, isLoading, isSuccess, isError} = useTracksSearch(query)
  
  function handleChange(e) {
    setQuery(e.target.value)
  }

  function handleSubmit(query) {
    setQuery(query)
  }

  function handleReset() {
    setQuery('')
  }

  return (
    <Browse>
      <SearchForm searchQuery={query} onSubmit={handleSubmit} onChange={handleChange} />
      <hr  css={{width: '100%'}} />
      {isError ? (
        <div css={{color: colors.danger}}>
          Sorry, there was an error. Try refreshing the page or log in again.
        </div>
      ) : null}
      
      {isIdle || !query.length ? (
        <span>
          Search tracks
        </span>
      ) : isLoading ? (
        <SpotifyTrackInfoFallback limit={15} />
      ) : isSuccess && tracks.body.tracks.items ? (
        <SpotifyTrackDataView data={tracks.body.tracks.items} />
      ) : isSuccess && !tracks.body.tracks.items ? (
        <span>
          Hmmm... I coudln't find any tracks to suggest for you. Sorry.
        </span>
      ) : null}
    </Browse>
  )
}

export {Search}