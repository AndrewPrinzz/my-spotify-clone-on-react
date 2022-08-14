const localStorageKey = '__auth_provider_token__'

async function getToken(code) {
  // if we were a real auth provider, this is where we would make a request
  // to retrieve the user's token. (It's a bit more complicated than that...
  // but you're probably not an auth provider so you don't need to worry about it).
  const [accessToken, setAccessToken] = React.useState()
  const [refreshToken, setRefreshToken] = React.useState()
  const [expiresIn, setExpiresIn] = React.useState()

  React.useEffect(() => {
    axios.post(`${REACT_APP_URL}/login`, {
      code: code
    }).then(res => {
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, '/')
    }).catch((err) => {
      console.log('err 1: ', err);
      window.location = '/'
    })
  }, [code])

  React.useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios.post(`${REACT_APP_URL}/refresh`, {
        refreshToken
      }).then(res => {
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      }).catch((err) => {
        console.log('err 2: ', err);
        window.location = '/'
      })
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken

  // return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({ user }) {
  window.localStorage.setItem(localStorageKey, user.token)
  return user
}

function login(params) {
  
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

const authUrl = "https://accounts.spotify.com/authorize?client_id=b614d13fd2e74dec81743395e7d0efd6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
// const authUrl = process.env.REACT_APP_AUTH_URL

function client(params) {
  
}

export {logout, localStorageKey}