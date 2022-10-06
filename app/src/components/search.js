/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'

import {
  SpotifySearchTracksDataView,
  SearchQueryErrorBoundary,
} from 'components/playlists'

import {Player} from 'components/player'
import {QueryDataCacheProvider} from 'context/query-data-cache-context'
import {useQueryDataCache} from 'context/query-data-cache-context'
import {useLocalStorageState} from 'utils/hooks'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import {useAccessToken} from 'context/auth-context'
import {
  SpotifyTrackInfoFallback,
  SpotifyTrackDataView
} from 'components/tracks'
import {useQuery} from 'react-query'

function SpotifySearchQueryInfo({searchQuery}) {
  const [accessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  // caching data for a better user expirience
  const [cache, dispatch] = useQueryDataCache()

  // And we’ll get all of the same stuff except for run. Because useQuery is gonna manage that for us
  const {status, data: searchData, isIdle, isLoading, isSuccess, isLoadingError, setData, error, run} = useQuery({
    // 1 - unique identifier 2 - uniqly identify this query 
    queryKey: ['trackSearch', {searchQuery}],
    // query function is what I'm pussing to run rn
    queryFn: () => spotifyApi.searchTracks(searchQuery, {
      limit: 15
    }),
    enabled: searchQuery ? true : false
  })
  console.log('searchData: ', searchData);
  // we don't need useEffect anymore so we got rid of it

  // write a component for handling player data because it doesn't render so there's always an error
  if (isIdle) {
    return 'Search tracks'
  } else if (isLoading) {
    return <SpotifyTrackInfoFallback limit={15} />
  } else if (isLoadingError) {
    throw error
  } else if (isSuccess) {
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