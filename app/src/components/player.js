import {useOffset, usePlayer} from 'context/player-context'

import React from 'react'
import {useMutation} from 'react-query'
import SpotifyPlayer from 'react-spotify-web-playback'
import {useQueryClient} from 'react-query'
import {useSavedTracks} from 'utils/tracks'
import {useAuth} from 'context/auth-context'

function Player() {
  const {accessToken} = useAuth()
  
  const [play, setPlay] = React.useState(false)
  const [offset] = useOffset()
  // getting track uri
  const [player] = usePlayer()
  const queryClient = useQueryClient()
  
  React.useEffect(() => {
    // console.log('something changed');
    setPlay(true)
  }, [player, accessToken])

  useSavedTracks()

  const {mutateAsync} = useMutation(
    (state) => {
      // React query will refetch my saved tracks everytime I pause/play or switch track or like/dislike. Unfortunately, with the `react-spotify-web-playback` API I didn't find any way to catch when I like/dislike so it's gonna update my saved tracks everytime the state of the player changes
      if (!state.isPlaying) setPlay(false)
    },
    {onSettled: () => queryClient.invalidateQueries('your-album')},
  )
  
  return (
    <SpotifyPlayer
      styles={{bgColor: 'transparent'}}
      token={accessToken}
      showSaveIcon
      callback={state => mutateAsync(state)}
      offset={offset}
      play={play}
      uris={player ? player : []}
      updateSavedStatus={() => console.log('updated')}
      // uris={testThnig}
    />
  )
}

export {Player}