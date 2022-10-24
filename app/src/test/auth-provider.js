function useGetToken() {
  const code = new URLSearchParams(window.location.search).get('code')

  const {accessTokenValue, refreshTokenValue, expiresInValue, timeStampValue} = useAuthData()

  React.useEffect(() => {
    // if we have access token in our localStorage then we do nothing
    if (!code) return

    axios.post(`${process.env.REACT_APP_URL}/login`, {
      code: code
    }).then(res => {
      // setAccessToken(res.data.accessToken)
      // setLocalStorageAccessToken(res.data.accessToken)
      accessTokenValue(res.data.accessToken)

      // setRefreshToken(res.data.refreshToken)
      // setLocalStorageRefreshToken(res.data.refreshToken)
      refreshTokenValue(res.data.refreshToken)

      // setExpiresIn(res.data.expiresIn)
      // setlocalStorageExpiresIn(res.data.expiresIn)
      expiresInValue(res.data.expiresIn)

      // setTimestamp(Date.now())
      // setLocalStorageTimeStamp(Date.now())
      timeStampValue(Date.now())

      window.history.pushState({}, null, '/')
    }).catch((err) => {
      console.log('err 1: ', err);
      window.location = '/'
    })
  }, [code])

  React.useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios.post(`${process.env.REACT_APP_URL}/refresh`, {
        refreshToken
      }).then(res => {

        setAccessToken(res.data.accessToken)
        setLocalStorageAccessToken(res.data.accessToken)

        setRefreshToken(res.data.refreshToken)
        setLocalStorageRefreshToken(res.data.refreshToken)

        setExpiresIn(res.data.expiresIn)
        setlocalStorageExpiresIn(res.data.expiresIn)

        setTimestamp(Date.now())
        setLocalStorageTimeStamp(Date.now())

      }).catch((err) => {
        console.log('err 2: ', err);
        window.location = '/'
      })
      // calc time the token will expire (spoiler: it's 3600ms)
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}