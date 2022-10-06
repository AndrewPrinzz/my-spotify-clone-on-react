import * as React from 'react'

function useSafeDispatch(dispatch) {
  // make sure we don't call this function if our component has been unmounted
  const mounted = React.useRef(false)
  // `useEffect` fires synchronously after all DOM mutations. `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
  React.useLayoutEffect(() => {
     // set this to true when value is mounted
    mounted.current = true
    // return a cleanup function which will be called when we’re getting unmounted
    return () => (mounted.current = false)
  }, [])
  return React.useCallback(
    // if mounter we can call unsafeDispatch function. We take and paste any number of args
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = {status: 'idle', data: null, error: null}
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer(
    // we don't create a helper useReducer function. We're gonna create it above instead. Look at the `setSafeState`. The first argument we should pass is our state and the second one is our action
    (s, a) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  // set data for caching purposes
  const setData = React.useCallback(
    data => safeSetState({data, status: 'resolved'}),
    [safeSetState],
  )
  // set error for caching purposes
  const setError = React.useCallback(
    error => safeSetState({error, status: 'rejected'}),
    [safeSetState],
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState],
  )

  // memorized function. We don't wanna create a new one everytime we use/run it
  const run = React.useCallback(
    promise => {
      if (!promise || !promise.then) {
        console.log('promise: ', promise);
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({status: 'pending'})
      return promise.then(
        data => {
          setData(data)
          return data
        },
        error => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export {useAsync}
