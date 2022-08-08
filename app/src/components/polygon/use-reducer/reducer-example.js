/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from "react"

/* 🔗 Default Reducer */

// function countReducer(state, newState) {
//   return newState
// }

// function Counter({ step = 1, initialCount = 0 }) {
//   const [count, changeCount] = React.useReducer(countReducer, initialCount)
//   const increment = () => changeCount(count + step)

//   return <button css={{ color: '#000' }} onClick={increment}>{count}</button>
// }


/* 🔗 SUMULATE SETSTATE WITH AN OBJECT */

/* So then what we need to do is take that existing state that we have and combine it with the action which is the value that passed to dispatch function here. And that will get us a new state and then we return that value 
So what I’m gonna do is we’ll just return an object that has a combination of that state and that action. So any properties that action has will overwrite the properties in the state and that will simulate our state and setState from our class components.  */

// const countReducer = (state, action) => ({...state, ...action})

// function Counter({initialCount = 0, step = 1}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () => setState({count: count + step})

//   return <button css={{ color: '#000' }} onClick={increment}>{count}</button>
// }

/* 🔗 SIMULATE SETSTATE WITH AN OBJECT OR FUNCTION */

// const countReducer = (state, action) => ({
//   ...state, 
//   ...(typeof action === 'function' ? action(state) : action)
// })

// function Counter({initialCount = 0, step = 1}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () => setState({count: count + step})

//   return <button css={{ color: '#000' }} onClick={increment}>{count}</button>
// }

/* 🔗 TRADITIONAL DISPATCH OBJECT WITH A TYPE AND SWITCH STATEMENT */

function CountReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {count: state.count + action.step}
    }
    case 'DECREMENT': {
      return {count: state.count - action.steo}
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function Counter({initialCount = 0, step = 3}) {
  const [state, dispatch] = React.useReducer(CountReducer, {
    count: initialCount
  })
  const {count} = state
  const increment = () => dispatch({type: 'INCREMENT', step})
  return <button css={{color:'#000'}} onClick={increment}>{count}</button>
}

export {Counter}