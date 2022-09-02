/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'
import {useAccessToken} from 'context/auth-context'
import {useOffset, usePlayer} from 'context/player-context'

import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

function Player() {
  const [accessToken] = useAccessToken()
  
  const [play, setPlay] = React.useState(false)
  const [offset] = useOffset()
  // getting track uri
  const [player] = usePlayer()


  React.useEffect(() => {
    console.log('something changed');
    setPlay(true)
  }, [player])

  function handleCallback(state) {
    console.log('state: ', state);
    if (!state.isPlaying) setPlay(false)
    console.log('something changed');
  }

  if (!accessToken) return null
  
  return (
    <SpotifyPlayer
      styles={{bgColor: 'transparent'}}
      token={accessToken}
      showSaveIcon
      callback={state => handleCallback(state)}
      offset={offset}
      play={play}
      uris={player ? player : []}
      // uris={testThnig}
    />
  )
}

export {Player}