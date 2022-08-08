function useSpotifySearch({ accessToken, searchQuery, ...initialState }) {
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  React.useDebugValue('Hi!!')

  // if you call this function that’s going to trigger a rerender even if the component not unmounted
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    spotifyData: null,
    error: null,
    ...initialState
  }, [])

  // make sure we don't call this function if our component has been unmounted
  const mountedRef = React.useRef(false)
  React.useEffect(() => {
    // set this to true when value is mounted
    mountedRef.current = true
    return () => {
      // return a cleanup function which will be called when we’re getting unmounted
      mountedRef.current = false
    }
  }, [])

  // if mounted then we now that it’s mounted and it’s safe to call the unsafe dispatch function
  const dispatch = React.useCallback((...args) => {
    // if mounter we can call unsafeDispatch function
    if (mountedRef.current) {
      // take and paste any number of args
      unsafeDispatch(...args)
    }
    // empty because useReducer dispatch function is stable
  }, [])

  // ensure we have access token
  React.useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  function reducedSearchResults(res) {
    return res.body.tracks.items.map(track => {
      const smallestAlbumImage = track.album.images.reduce(
        (smallest, image) => {
          if (image.height < smallest.height.height) return image
          return smallest
        },
        track.album.images[0]
      )

      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: smallestAlbumImage.url
      }
    })
  }

  React.useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    dispatch({ type: 'pending' })
    spotifyApi.searchTracks(search)
      .then(
        res => {
          dispatch({
            type: 'resolved',
            data: reducedSearchResults(res)
          })
          setSearchResults(
            reducedSearchResults(res)
          )
        }, error => {
          dispatch({ type: 'rejected', error: 'There was an error' })
        }
      )

  }, [search, accessToken])

  return {
    searchResults,
    setSearch
  }
}

function useSpotifySearch2({ accessToken }) {
  const [search, setSearch] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])

  // checking if we have access token
  React.useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])


  React.useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return
    console.log('search: ', search);

    let cancel = false
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return

      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        })
      )
    })
    return () => cancel = true
  }, [
    search,
    accessToken
  ])

  return {
    searchResults,
    setSearch
  }
}

const formatDebugValue = ({ status, data, error }) => `status: ${status}; data: ${data}; error: ${error}`

function useSpotifyData({ delay, ...initialState } = {}) {

  const defaultProps = {
    country: 'US',
    locale: 'en_US',
    ...initialState
  }

  // if you call this function that’s going to trigger a rerender even if the component not unmounted
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState
  })

  const { status, data, error } = state

  // To check status of data processing in React Devtools intead of console
  React.useDebugValue({ status: status, data: !!JSON.stringify(data?.body), error: error }, formatDebugValue)

  const dispatch = useSafeDispatch(unsafeDispatch)

  // 🧾 featured playlists
  /*
  React.useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)

    dispatch({type: 'pending'})
    spotifyApi[func]({...defaultProps, ...props})
      .then(
        data => {
          console.log('data: ', data);
          dispatch({type: 'resolved', spotifyData: data.body.playlists.items})
        },
        error => {
          console.log('error: ', error);
          dispatch({error, type: 'rejected'})
        }
      )
  }, [accessToken])*/

  // memorized function. We don't wanna create a new one everytime we use/run it
  const run = React.useCallback(promise => {
    // if (!accessToken) return
    // spotifyApi.setAccessToken(accessToken)
    dispatch({ type: 'pending' })
    // spotifyApi[func]({ ...defaultProps, ...props })
    promise
      .then(
        data => {
          // setting delay for testing purposes
          delay ?
            setTimeout(() =>
              dispatch({ type: 'resolved', data: data }),
              // dispatch({type: 'resolved', data: data.body.playlists.items}), 
              // setting delay
              typeof (delay) !== 'number' ? 1500 : delay) :
            dispatch({ type: 'resolved', data: data })
        },
        error => {
          console.log('error: ', error);
          dispatch({ type: 'rejected', error: 'There was an error' })
        }
      )
    // dispatch will never change. useReducer ensures that for us
  }, [dispatch])

  const setData = React.useCallback(
    data => dispatch({ type: 'resolved', data }),
    [dispatch],
  )
  const setError = React.useCallback(
    error => dispatch({ type: 'rejected', error }),
    [dispatch],
  )

  return {
    // ...state,
    setData,
    setError,
    error,
    status,
    data,
    run
  }
}