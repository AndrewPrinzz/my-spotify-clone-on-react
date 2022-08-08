import * as React from 'react'
import {Switch} from './switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)


  // You can think of `React.children.map` as basically an `array.map` or `[].map()`
  // So what we need to do here is I need to return a new child because that’s what is gonna be returned from this toggle component
  return React.Children.map(children, child => {
    // if the typeof child.type is a string then we’ll just go ahead and return the original child otherwise we can make a clone and we’re all good. This way we support DOM component children
    if (typeof child.type === 'string') {
      return child
    }
    // React makes it that so you cannot modify the props directly. And instead they want you to say the `React.cloneElement`
    const newChild = React.cloneElement(child, {on, toggle})
    return newChild
  })

  // But if you don’t want people to do this you can say okay here’s my allowed types that’s Toggle, ToggleOff and ToggleButton. And then in here we can say if allowedTypes inclides that then we can do these clone stuff, otherwise we’ll just return the original child 
  /*
  return React.Children.map(children, child => {
    if(allowedTypes.includes(child.type)) {
      const newChild = React.cloneElement(child, {on, toggle})
      return newChild
    }
    return child
  })
  */
}

// We’re going to except two props: `on` and `children` and then if on is true then we return the children otherwise we return null 
const ToggleOn = ({on, children}) => (on ? children : null)

// And then our `ToggleOff` will be very similar
const ToggleOff = ({on, children}) => (on ? null : children)

// We’re going to except `on` as our state and `toggle` as the function that we wanna use to change our state
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function MyToggleButton({on, toggle}) {
  return on ? 'the button is on yo.' : 'the button is off sooooo..'
}

function ToggleApp() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
        <MyToggleButton />
      </Toggle>
    </div>
  )
}

export {ToggleApp}