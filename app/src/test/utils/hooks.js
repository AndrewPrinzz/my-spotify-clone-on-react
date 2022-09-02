function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useSafeDispatch(dispatch) {
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

  return React.useCallback((...args) => {
    // if mounter we can call unsafeDispatch function
    if (mountedRef.current) {
      // take and paste any number of args
      dispatch(...args)
    }
    // empty because useReducer dispatch function is stable
  }, [dispatch])

}

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

  // memorized function. We don't wanna create a new one everytime we use/run it
  const run = React.useCallback(promise => {
    dispatch({ type: 'pending' })
    promise
      .then(
        data => {
          // setting delay for testing purposes
          delay ?
            setTimeout(() =>
              dispatch({ type: 'resolved', data: data }),
              // setting delay for testing purposes. delay: true sets delay for 1500. Or we set our own delay
              typeof (delay) !== 'number' ? 1500 : delay) :
            // if delay is false we show the data immediately
            dispatch({ type: 'resolved', data: data })
        },
        error => {
          console.log('error: ', error);
          dispatch({ type: 'rejected', error: 'There was an error' })
        }
      )
    // dispatch will never change. useReducer ensures that for us. But we pass it for ESLint
  }, [dispatch])

  // set data for caching purposes
  const setData = React.useCallback(
    data => dispatch({ type: 'resolved', data }),
    [dispatch],
  )
  // set error for caching purposes
  const setError = React.useCallback(
    error => dispatch({ type: 'rejected', error }),
    [dispatch],
  )

  return {
    setData,
    setError,
    error,
    status,
    data,
    run
  }
}