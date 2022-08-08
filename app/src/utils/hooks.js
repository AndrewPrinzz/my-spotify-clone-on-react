import React from 'react'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'

const REACT_APP_URL = 'http://localhost:3001'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
})

function useAuth(code) {
  const [accessToken, setAccessToken] = React.useState()
  const [refreshToken, setRefreshToken] = React.useState()
  const [expiresIn, setExpiresIn] = React.useState()

  React.useEffect(() => {
    axios.post(`${REACT_APP_URL}/login`, {
      code: code
    }).then(res => {
      console.log('res: ', res)
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, '/')
    }).catch((err) => {
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
}

function useLocalStorageState(key, defaultValue = 'active', {
  serialize = JSON.stringify,
  deserialize = JSON.parse,
} = {}) {
  // find out the current variant and get the current item out of the local storage
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key) || defaultValue
    if (valueInLocalStorage) {
      // parse the value we've got
      return deserialize(valueInLocalStorage)
    }
    // default value could be a function
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  }
  )

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

export {useAuth, useLocalStorageState, useSpotifyData}