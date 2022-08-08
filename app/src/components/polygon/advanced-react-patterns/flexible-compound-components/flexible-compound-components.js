import * as React from 'react'
import {Switch} from './switch'

// We use this pattern 

// instead of returning react children map of all the children and forwarding along the props by making clones of these children. Instead we created a toggle context 
const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    // and then we rendered the provider of the value of thise things we wanted to provide to those children 
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(`useToggle must be used within a <Toggle />`)
  }
  return context
}

// And then in each of the children we consumed that context here so we can have access to the implicit state
function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
} 

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
} 

function ToggleButton(props) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function MyToggleButton() {
  const {on} = useToggle()
  return on ? 'the button is on yo.' : 'the button is off sooooo..'
}

function FlexibleToggleApp() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <div>
          <ToggleButton />
        </div>
        <MyToggleButton />
      </Toggle>
    </div>
  )
}

export {FlexibleToggleApp}