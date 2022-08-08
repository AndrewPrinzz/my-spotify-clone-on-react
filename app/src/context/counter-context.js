import React from 'react'

const CountContext = React.createContext()

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within the CountProvider`)
  }

  return context
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]

  return <CountContext.Provider value={value} {...props} />
}

function CountDisplay(props) {
  const [count] = React.useContext(CountContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter(props) {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button style={{ color: '#000' }} onClick={increment}>Incerement count</button>
}

function CounterContext() {
  return (
    <div>
      <CountProvider>
          <CountDisplay />
          <Counter />
        </CountProvider>
    </div>
  )
}

export {CounterContext}