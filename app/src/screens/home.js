/** @jsxImportSource @emotion/react */
import {jsx}  from '@emotion/react'

import React from 'react'
import {Greeting, PlayListItems,ChartBlock, ChartBlocks, InterfaceDspr, InterfaceTitle, MusicResults} from 'components/lib'
import {ChartTrackTemplate} from 'components/chart'
import {chart} from 'test/chart-data'
import {Browse} from 'components/lib'
import {Player} from 'components/player'
import {useSpotifyData} from 'utils/hooks'
import {ErrorBoundary} from 'react-error-boundary'
import {
  SpotifyPlaylistInfoFallback,
  SpotifyPlaylistDataView,
  SpotifySearchTracksDataView,
  SearchQueryErrorBoundary,
  SearchForm
} from 'spotify'
import {ErrorMessage} from 'components/error-fallbacks'
import {useAccessToken, useSpotifyWebAPI} from 'context/auth-context'
import {useQueryDataCache} from 'context/query-data-cache-context'
import {QueryDataCacheProvider} from 'context/query-data-cache-context'


function SpotifyPlaylistInfo() {
  const [accessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  const {status, data, error, run} = useSpotifyData({
    status: 'pending',
    delay: false
  })
  
  const endpointData = {
    limit: 4,
    country: 'US',
    locale: 'en_US',
  }

  React.useEffect(() => {
    if (!accessToken) {
      return
    }
    spotifyApi.setAccessToken(accessToken)
    run(spotifyApi.getFeaturedPlaylists(endpointData))
  }, [accessToken, run])

  if (status === 'pending') {
    return <SpotifyPlaylistInfoFallback data={endpointData} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <SpotifyPlaylistDataView data={data.body.playlists.items} />
  }
  
  throw new Error('This should be impossible')
}

function QuerySection({searchQuery}) {

  return (
    <QueryDataCacheProvider>
      <div className="query-info">
        <SearchQueryErrorBoundary
          // onReset={handleReset}
          resetKeys={[searchQuery]}
        >
          <SpotifySearchQueryInfo searchQuery={searchQuery} />
          <div>
            <Player />
          </div>
        </SearchQueryErrorBoundary>
      </div>
    </QueryDataCacheProvider>
  )
}

function PreviousQuery({onSelect}) {
  const cache = useQueryDataCache()
  
  return (
    <div>
      PreviousQuery
      <ul css={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(searchQuery => (
          <li key={searchQuery} css={{margin: '4px auto'}}>
            <button
              css={{width: '100%', color: '#fff', background: 'transparent'}}
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
    delay: false
  })

  React.useEffect(() => {
    if (!searchQuery) {
      return
    } 
    else if(cache[searchQuery]) {
      console.log('cache: ', cache);
      setData(cache[searchQuery])
    } 
    else {
      run(
        spotifyApi.searchTracks(searchQuery)
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
    return 'pending...'
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    

    return <SpotifySearchTracksDataView data={searchData} accessToken={accessToken} />
  }
  
  throw new Error('This should be impossible')
}

function Home() {
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
      {/* Playlists */}
      <Greeting>Good Evening</Greeting>
      <PlayListItems>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <SpotifyPlaylistInfo />
        </ErrorBoundary>
      </PlayListItems>
      {/* Chart */}
      <InterfaceTitle>Smoothly releases</InterfaceTitle>
      <InterfaceDspr>New releases on Smoothly</InterfaceDspr>
      <ChartBlocks>
        <ChartBlock>
          {chart.slice(0, 5).map(({id, ...props}) => (
            <ChartTrackTemplate key={id} {...props} />
          ))}
        </ChartBlock>
        <ChartBlock>
          {chart.slice(5, 10).map(({id, ...props}) => (
            <ChartTrackTemplate key={id} {...props} />
          ))}
        </ChartBlock>
      </ChartBlocks>
      {/* Recently Played */}
      {/* <RecentlyPlayed /> */}
    </Browse>
  )
}

export {Home}