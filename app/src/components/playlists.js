/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'
import * as colors from 'styles/colors'
import {PlaylistImage, PlayListItem, PlayListTracks, PlayListItemIcon, MusicResults, PlayListTitle} from "components/lib"
import {Play} from "components/icons"
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {SearchResults} from 'components/search-results'
import {ErrorBoundary} from 'react-error-boundary'
import {usePlayer} from 'context/player-context'
import axios from 'axios'
import {SearchBox} from 'components/lib'
import {Link} from 'react-router-dom'

function SpotifyPlaylistInfoFallback({data}) {

  const fallbackSpotifyData = {
    "tracks": {
      "total": 'XXX'
    },
    "images": [
      {
        "url": fallbackSpotify,
      }
    ],
    fetchedAt: 'loading...'
  }

  // get limit to make an object
  const {limit} = data || 3
  // making an array for filling data
  const setData = Array(limit).fill(fallbackSpotifyData)

  return <SpotifyPlaylistDataView data={setData} />
}

function SpotifyPlaylistDataView({data}) {
  
  return (
    data.map(({images, album_type, type, tracks, id, name}, index) =>
      <PlayListItem
        key={index}
      >
        <Link to={`/${type || album_type}/${id}`}>
          <PlaylistImage
            color={colors.blue}
            cover={images[0].url}
          >
          </PlaylistImage>
        </Link>
        <PlayListTitle>{name}</PlayListTitle>
        <PlayListTracks>{tracks.total} tracks</PlayListTracks>
      </PlayListItem>
    )
  )
}

function SpotifySearchTracksDataView({data}) {
  const [playingTrack, setPlayingTrack] = React.useState()
  const [player, setPlayer] = usePlayer()

  const getData = data.body.tracks.items.map(track => {
    const smallestAlbumImage = track.album.images.reduce(
      (smallest, image) => {
        if (image.height < smallest.height.height) return image
        return smallest
      },
      track.album.images[0]
    )

    return {
      artist: track.artists[0].name,
      title: track.name,
      uri: track.uri,
      albumUrl: smallestAlbumImage.url
    }
  })

  function chooseTrack(track) {
    setPlayingTrack(track)

    setPlayer(track?.uri)
  }

  return (
    <>
      <MusicResults>
        {getData.map(track => 
          <SearchResults
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        )}
      </MusicResults>
    </>
  )
}

function ErrorFallback({error, resetErrorBoundary, ...props}) {
  return (
    <div role="alert">
      There was an error {' '}
      <pre style={{ whiteSpace: 'normal' }}></pre>
      <button onClick={resetErrorBoundary} style={{color: '#000'}}>Try again</button>
    </div>
    )
}

function SearchQueryErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

function SearchForm({
  searchQuery: externalSearchQuery,
  initialSearchQuery = externalSearchQuery || '',
  onChange,
  onSubmit
}) {

  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery)
  
  // this is generally not a great idea. We're synchronizing state when it is
  // normally better to derive it https://kentcdodds.com/blog/dont-sync-state-derive-it
  // however, we're doing things this way to make it easier for the exercises
  // to not have to worry about the logic for this SearchForm component.
  React.useEffect(() => {
    // note that because it's a string value, if the externalSearchQuery
    // is the same as the one we're managing, this will not trigger a re-render
    if (typeof externalSearchQuery === 'string') {
      setSearchQuery(externalSearchQuery)
    }
  }, [externalSearchQuery])

  const [playingTrack, setPlayingTrack] = React.useState()
  const [lyrics, setLyrics] = React.useState()

  function chooseTrack(track) {
    setPlayingTrack(track)
    // setSearch('')
    // setLyrics('')
  }

  // lyrics
  React.useEffect(() => {
    if (!playingTrack) return

    axios.get('http://localhost:3001/lyrics', {
      params: {
        track: playingTrack.title,
        artist: playingTrack.artist
      }
    }).then(res => {
      setLyrics(res.data.lyrics)
    })
  })

  function handleChange(e) {
    // if (!e.target.value) return
    // setSearch(e.target.value)
    onChange(e)
  }

  function handleSelect(newSearchQuery) {
    setSearchQuery(newSearchQuery)
    onSubmit(newSearchQuery)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <small css={{ display: 'block', marginBottom: '10px' }}>
        Try{' '}
        <button
          className="invisible-button"
          type="button"
          css={{ background: 'transparent', border: 'none', padding: 0 }}
          onClick={() => handleSelect('Lady Gaga')}
        >
          "Lady Gaga"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          css={{ background: 'transparent', border: 'none', padding: 0 }}
          onClick={() => handleSelect('Lo Fi Hip-Hop')}
        >
          "Lo Fi Hip-Hop"
        </button>
        {', or '}
        <button
          className="invisible-button"
          type="button"
          css={{ background: 'transparent', border: 'none', padding: 0 }}
          onClick={() => handleSelect('Alice et moi')}
        >
          "Alice et moi"
        </button>
      </small>
      <SearchBox>
        <div>
          <input
            type="text"
            placeholder="Search tracks..."
            onChange={handleChange}
            value={searchQuery}
          />
        </div>
      </SearchBox>
    </form>
  )
}

export {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView, 
  SpotifySearchTracksDataView, 
  SearchQueryErrorBoundary,
  SearchForm
}