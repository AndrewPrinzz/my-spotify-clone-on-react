/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'
import {useParams} from 'react-router-dom'
import {useSpotifyData} from 'utils/hooks'
import {useAccessToken} from 'context/auth-context'
import { useSpotifyWebAPI } from 'context/spotify-web-api-context'

function Artist() {
  // 
  const {id} = useParams()
  console.log('id: ', id);
  const [accessToken] = useAccessToken()
  const spotifyApi = useSpotifyWebAPI()

  const {status, data, error, run, isLoading, isSuccess} = useSpotifyData({
    status: 'pending',
  })

  React.useEffect(() => {
    if (!accessToken) {
      return
    }

    run(spotifyApi.getPlaylist(id))
  }, [accessToken, run])
  
  console.log('playlist data', data)

  return (
    'Wow it works :)'
  )
}

export {Artist}