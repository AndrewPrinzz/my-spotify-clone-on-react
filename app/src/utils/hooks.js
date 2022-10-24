import React from 'react'

// Usage: `const [localStorage, setLocalStorage] = useLocalStorageState('key', 'value')`
// or
// `const [localStorage, setLocalStorage] = useLocalStorageState('value')`
// `useLocalStorageState('value')`
function useLocalStorageState(
  key, 
  defaultValue = '', 
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  // find out the current variant and get the current item out of the local storage
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // parse the value we've got
      return deserialize(valueInLocalStorage)
    }
    // default value could be a function
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  }
  )

  React.useDebugValue(`${key}: ${serialize(state)}`)

  // if the key changes we want to remove this so we need to track it. It's better for perfomance because we don't trigger rerender
  const prevKeyRef = React.useRef(key)

  // set item to local storage if compontent was rerendered
  React.useEffect(() => {
    const prevKey = prevKeyRef.current

    // remove previous key if we have something
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    // track the current key
    prevKeyRef.current = key

    // we use JSON.stringify in case if we got a number
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}


// debug value in React Dev Tools helper function
const formatDebugValue = ({status, data, error}) => `status: ${status}; data: ${data}; error: ${error}`

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
// const {data, error, status, run} = useSpotifyData()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = {status: 'idle', data: null, error: null, delay: false}
function useSpotifyData(initialState) {

  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{status, data, error, delay}, setState] = React.useReducer(
    // we don't create a helper useReducer function. We're gonna create it above instead. Look at the `setSafeState`. The first argument we should pass is our state and the second one is our action
    (s, a) => ({...s, ...a}),
    initialStateRef.current,
  )

  React.useDebugValue({status: status, data: !!JSON.stringify(data?.body), error: error}, formatDebugValue)
  
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
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({status: 'pending'})
      return promise.then(
        data => {
          // we do that to be able to set delay shotrly 
          const returnData = () => {setData(data); return data}
          // setting delay for testing purposes
          delay ? 
            setTimeout(() => 
              returnData(), 
              // setting delay for testing purposes. delay: true sets delay for 1500. Or we set our own delay
              typeof(delay) !== 'number' ? 1500 : delay) :
              // if delay is false we show the data immediately
              returnData()
        },
        error => {
          // console.log('error logout ', error);
          // window.location = '/'
          // auth.logout()
          
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError, delay],
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

export {
  useLocalStorageState, 
  useSpotifyData,
}