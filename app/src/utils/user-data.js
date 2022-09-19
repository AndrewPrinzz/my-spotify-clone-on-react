import React from 'react'
import {useSpotifyData} from 'utils/hooks'
import {useAccessToken} from 'context/auth-context'
import {useSpotifyWebAPI} from 'context/spotify-web-api-context'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'
import {useUserData as useUserDataContext} from 'context/user-data-context'

const fallbackUserData = {
  body: {
    "display_name": "Loading...",
    "email": "Loading...",
    "id": "Loading...",
    "images": [
      {
        "url": fallbackSpotify
      }
    ],
    // we can recognize here either the user is `premium` or not
    "product": "loading...",
  }
}

function useUserData() {
  // console.log('userData: ', userData);
  const [userData, setUserData] = useUserDataContext(fallbackUserData)

  const [accessToken] = useAccessToken()
  const spotifyWebApi = useSpotifyWebAPI()

  const {status, data, error, run, isLoading, isSuccess} = useSpotifyData({
    status: 'pending',
  })

  React.useEffect(() => {
    if (!accessToken) return

    run(spotifyWebApi.getMe())
  }, [accessToken])

  if (
    userData.body.display_name !==
    fallbackUserData.body.display_name) {      
    return userData
  } else if (status === 'pending') {
    return fallbackUserData
  } else if (status === 'error') {
    throw error
  } else if (status === 'resolved') {
    return data
  }
  setUserData(data)
}

export {useUserData}
