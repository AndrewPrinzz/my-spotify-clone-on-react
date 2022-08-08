import * as React from 'react'
import {Switch} from './switch'

// We use this pattern to pass to use React's featchers such as `onClick`, `OnChange` etc

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

// It's a function that I can call passing any number of fucntions  
// that we return a function that call all those functions

// this is gonna get any number of functions
function callAll2(...fns) {
  // this is gonna return takes any number of arguments. I do not care what these arguments are
  return (...args) => {
    // take these function and for each of those 
    fns.forEach(fn => {
      // if that function exists then we call these functons with all the args 
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}

  // if there's no arguments we return an empty object {onClick, ...props} = {} 
  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      // onClick: () => {
      //   // we only call OnClick if it is true
      //   onClick && onClick()
      //   toggle()
      // },
      /* or */
      //we call onClick and toggle but we call onClick if that function actually exists
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {on, getTogglerProps}
}

function PropsCollectionsAndGetters() {
  const {on, getTogglerProps} = useToggle()
 
  return (
    <div>
      
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        style={{color: '#000'}}
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

function oldApp() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {on, togglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button"
      {...togglerProps}

    >
      {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export {PropsCollectionsAndGetters}

/*
eslint
  no-unused-vars: "off",
*/
