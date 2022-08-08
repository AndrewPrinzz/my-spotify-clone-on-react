/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'

import React from 'react'

const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}

function newTodo(name) {
  return {id: Date.now(), name: name, complete: false}
}

function Todo({todo, dispatch}) {
  return (
    <div>
      <span css={{color: todo.complete ? 'red' : '#fff'}}>
        {todo.name}
      </span>
      <button 
        css={{color: '#000'}}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id} })}
      >
        Toggle
      </button>
      <button 
        css={{color: '#000'}}
        onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })}
      >
        Delete
      </button>
    </div>
  )
}

function TodoApp() {
  const [todos, dispatch] = React.useReducer(todoReducer, [])
  const [name, setName] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: {name: name} })
    setName('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          css={{color: '#000'}}
          onChange={(e => setName(e.target.value))}
        />
        </form>
        {todos.map(todo => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        })}
    </>
  )
}

export {TodoApp}