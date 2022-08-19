import React from 'react'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'
import {useAccessToken} from 'context/auth-context'

const REACT_APP_URL = 'http://localhost:3001'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
})

function useAuth() {
  const code = new URLSearchParams(window.location.search).get('code')

  const [accessToken, setAccessToken] = useAccessToken('__auth_provider_access_token__')
  const [refreshToken, setRefreshToken] = useLocalStorageState('__auth_provider_refresh_token__')
  const [expiresIn, setExpiresIn] = useLocalStorageState('__auth_provider_expire_time__')
  const [timeStamp, setTimestamp] = useLocalStorageState('__auth_provider_token_timestamp__')

  React.useEffect(() => {
    // if we have access token in our localStorage then we do nothing
    if (!code) return
    
    axios.post(`${REACT_APP_URL}/login`, {
      code: code
    }).then(res => {
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      setTimestamp(Date.now())
      
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
        console.log('Access token has been refreshed');

        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
        setTimestamp(Date.now())
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

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    } 
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
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

// debug value in React Dev Tools helper function
const formatDebugValue = ({status, data, error}) => `status: ${status}; data: ${data}; error: ${error}`

function useSpotifyData({delay, ...initialState} = {}) {

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

  const {status, data, error} = state

  // To check status of data processing in React Devtools intead of console
  React.useDebugValue({status: status, data: !!JSON.stringify(data?.body), error: error}, formatDebugValue)

  const dispatch = useSafeDispatch(unsafeDispatch)

  // memorized function. We don't wanna create a new one everytime we use/run it
  const run = React.useCallback(promise => {
    dispatch({type: 'pending'})
    promise
      .then(
        data => {
          // setting delay for testing purposes
          delay ? 
            setTimeout(() => 
              dispatch({type: 'resolved', data: data}), 
              // setting delay for testing purposes. delay: true sets delay for 1500. Or we set our own delay
              typeof(delay) !== 'number' ? 1500 : delay) :
              // if delay is false we show the data immediately
              dispatch({type: 'resolved', data: data})
        },
        error => {
          console.log('error: ', error);
          dispatch({type: 'rejected', error: 'There was an error'})
        }
      )
  // dispatch will never change. useReducer ensures that for us. But we pass it for ESLint
  }, [dispatch])

  // set data for caching purposes
  const setData = React.useCallback(
    data => dispatch({type: 'resolved', data}),
    [dispatch],
  )
  // set error for caching purposes
  const setError = React.useCallback(
    error => dispatch({type: 'rejected', error}),
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

function useSafeDispatch2(dispatch) {
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
// const {data, error, status, run} = useSpotifyData2()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
const defaultInitialState = {status: 'idle', data: null, error: null, delay: false}
function useSpotifyData2(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{status, data, error, delay}, setState] = React.useReducer(
    // we don't create a helper useReducer function. We're gonna create it above instead. Look at the `setSafeState`. The first argument we should pass is our state and the second one is our action
    (s, a) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch2(setState)

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

export {useAuth, useLocalStorageState, useSpotifyData, useSpotifyData2}