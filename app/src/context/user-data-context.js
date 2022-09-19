import React from 'react'
import {useAccessToken} from './auth-context'
import {useSpotifyWebAPI} from './spotify-web-api-context'
import {useSpotifyData} from 'utils/hooks'
import fallbackSpotify from 'assets/img/spotify/fallback-spotify.jpg'

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

const UserNameContext = React.createContext()
UserNameContext.displayName = 'userNameContext'

function UserDataProvider(props) {
  const [userName, setUserName] = React.useState()

  const value = [userName, setUserName]

  return <UserNameContext.Provider value={value} {...props} />
}

function useUserData() {
  const context = React.useContext(UserNameContext)  
  const [userData, setUserData] = context

  const [accessToken] = useAccessToken()
  const spotifyWebApi = useSpotifyWebAPI()

  const {status, data, error, run, isLoading, isSuccess} = useSpotifyData({
    status: 'pending',
  })

  React.useEffect(() => {
    if (!accessToken) return
    
    run(spotifyWebApi.getMe())
  }, [accessToken, run])

  setUserData(data)
  
  if (!context) {
    throw new Error(`UserName must be rendered within the RefreshUserName`)
  }
  
  return context
}


export {
  UserDataProvider,
  useUserData
}