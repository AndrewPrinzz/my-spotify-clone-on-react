/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'
import {useAccessToken} from 'context/auth-context'
import {usePlayer} from 'context/player-context'
import {useLocalStorageState} from 'utils/hooks'

import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function Player() {
  const [accessToken] = useAccessToken()
  
  const [play, setPlay] = React.useState(false)
  // getting track uri
  const [player] = usePlayer()

  React.useEffect(() => {
    setPlay(true)
  }, [player])

  if (!accessToken) return null
  
  return (
    <SpotifyPlayer
      styles={{bgColor: 'transparent'}}
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={player ? [player] : []}
    />
  )
}

export {Player}