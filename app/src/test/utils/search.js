/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'

import {
  SpotifySearchTracksDataView,
  SearchQueryErrorBoundary,
} from 'components/playlists'

import {Player} from 'components/player'
import {useSpotifyData} from 'utils/hooks'
import {QueryDataCacheProvider} from 'context/query-data-cache-context'
import {useQueryDataCache} from 'context/query-data-cache-context'
import {useLocalStorageState} from 'utils/hooks'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {useAccessToken} from 'context/auth-context'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'components/tracks'
import { useQuery } from 'react-query'

function PreviousQuery({onSelect}) {
  const cache = useQueryDataCache()

  return (
    <div>
      PreviousQuery
      <ul css={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.keys(cache).map(searchQuery => (
          <li key={searchQuery} css={{ margin: '4px auto' }}>
            <button
              css={{ width: '100%', color: '#fff', background: 'transparent' }}
              onClick={() => onSelect(searchQuery)}
            >
              {searchQuery}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SpotifySearchQueryInfo({searchQuery}) {
  const [accessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  // caching data for a better user expirience
  const [cache, dispatch] = useQueryDataCache()

  const {status, data: searchData, setData, error, run} = useSpotifyData({
    status: searchQuery ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!searchQuery) {
      return
    }
    else if (cache[searchQuery]) {

      setData(cache[searchQuery])
    }
    else {
      run(
        spotifyApi.searchTracks(searchQuery, {
          limit: 15
        })
          .then(searchQueryData => {
            // for caching purposese
            dispatch({type: 'ADD_QUERY', searchQuery, searchQueryData})
            return searchQueryData
          })
      )

    }
  }, [searchQuery, run])

  // write a component for handling player data because it doesn't render so there's always an error
  if (status === 'idle') {
    return 'Search tracks'
  } else if (status === 'pending') {
    return <SpotifyTrackInfoFallback limit={15} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    console.log(searchData.body.tracks.items);
    return <SpotifyTrackDataView data={searchData.body.tracks.items} />
  }

  throw new Error('This should be impossible')
}

function QuerySection({searchQuery}) {

  return (
    <QueryDataCacheProvider>
      <div className="query-info">
        <SearchQueryErrorBoundary
          resetKeys={[searchQuery]}
        >
          <SpotifySearchQueryInfo searchQuery={searchQuery} />
        </SearchQueryErrorBoundary>
      </div>
    </QueryDataCacheProvider>
  )
}

export {QuerySection}