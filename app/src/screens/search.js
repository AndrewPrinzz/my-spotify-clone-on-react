import React from 'react'

import {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView,
  SpotifySearchTracksDataView,
  SearchQueryErrorBoundary,
  SearchForm
} from 'utils/playlists'
import {Browse} from 'components/lib'
import {QuerySection} from 'utils/search'

function Search() {
  const [searchQuery, setSearchQuery] = React.useState('')

  function handleChange(e) {
    setSearchQuery(e.target.value)
  }

  function handleSubmit(newSearchQuery) {
    setSearchQuery(newSearchQuery)
  }

  function handleReset() {
    setSearchQuery('')
  }

  return (
    <Browse>
      <SearchForm searchQuery={searchQuery} onSubmit={handleSubmit} onChange={handleChange} />
      <hr />
      <QuerySection searchQuery={searchQuery} />
    </Browse>
  )
}

export {Search}