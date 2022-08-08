// Control Props
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import warning from 'warning'
import {Switch} from './switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case actionTypes.toggle: {
      return {on: !state.on}
    }
    case actionTypes.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useControlledSwitchWarning(controlPropValue, controlPropName, componentName) {
  const isControlled = controlPropValue != null
  const {current: wasControlled} = React.useRef(isControlled)

  React.useEffect(() => {
    warning(
      !(isControlled && !wasControlled),
      `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
    warning(
      !(!isControlled && wasControlled),
      `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
  }, [componentName, controlPropName, isControlled, wasControlled])
}

function useOnChangeReadOnlyWarning(
  controlPropValue,
  controlPropName,
  componentName,
  hasOnChange,
  readOnly,
  readOnlyProp,
  initialValueProp,
  onChangeProp,
) {

  const isControlled = controlPropValue != null

  React.useEffect(() => {
    warning(
      !(!hasOnChange && isControlled && !readOnly),
      `An \`${controlPropName}\` prop was provided to ${componentName} without an \`${onChangeProp}\` handler. This will render a read-only \`${controlPropName}\` value. If you want it to be mutable, use \`${initialValueProp}\`. Otherwise, set either \`${onChangeProp}\` or \`${readOnlyProp}\`.`,
    )
  }, [componentName, controlPropName, hasOnChange, initialValueProp, isControlled, onChangeProp, readOnly, readOnlyProp])
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  // add support for the onChange prop
  onChange,
  // initialize on to controlledOn
  on: controlledOn,
  // readonly for our warnings. If readOnly={true} then the warning won't show up
  readOnly = false
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  // find out that we passed something. If it's not undefined then I know it's being controlled
  const onIsControlled = controlledOn != null
  // if it is being controlled then the on variable should be from the controlledOn
  // if on is controlled then we get that value from the user otherwise we're managing it ourselves and we can grab it from our state
  const on = onIsControlled ? controlledOn : state.on
  
  // if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControlledSwitchWarning(controlledOn, 'on', 'useToggle')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnChangeReadOnlyWarning(  
      controlledOn,
      'one',
      'useToggle',
      Boolean(onChange),
      readOnly,
      'readOnly',
      'initialOn',
      'onChange',
    )
  // }

  // to add dispatch with on change and get an action
  function dispatchWithOnChange(action) {
    //we call this function only if on is not controlled else we call onChange
    if (onIsControlled === false) {
      // call dispatch with our action
      return dispatch(action)
    }
    // it allows us to add an onChange call here where we can call our onChange 
    // with our suggested changes. So the changes that we're going to make to the state
    // based on changes that happend. We have to call changes woth our suggested changes (state, action)
    // We call the onChange with the new state - reducer({...state, on}, action) - that we're gonna be transitioning to
    onChange?.(reducer({...state, on}, action), action)
  }

  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
  const reset = () => dispatchWithOnChange({type: actionTypes.reset, initialState})

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  function getResetterProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

// on is initialised to control on ->
function Toggle({on: controlledOn, onChange, readOnly}) {
  // -> and then beig passed to our useToggle as the on option
  const {on, getTogglerProps} = useToggle({on: controlledOn, onChange, readOnly})
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

// start from exersise
function MyTwoInputs() {
  const [capitalizedValue, setCapitalizedValue] = React.useState('')
  const [lowerCasedValue, setLowerCasedValue] = React.useState('')

  function handleInputChange(e) {
    setCapitalizedValue(e.target.value.toUpperCase())
    setLowerCasedValue(e.target.value.toLowerCase())
  }

  return (
    <>
      <input style={{color: '#000'}} value={capitalizedValue} onChange={handleInputChange} />
      <input style={{color: '#000'}} value={lowerCasedValue} onChange={handleInputChange} />
      <br /><br /><br /><br />
    </>
  )
}
// end from exersise

function ControllProps() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick() {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <MyTwoInputs />
      <div>
        {/* we're passing the on property so if on is null/undefined then we know what we're being controlled */}
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button style={{color: '#000'}} onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}

export default ControllProps
// we're adding the Toggle export for tests
export {Toggle}

/*
eslint
  no-unused-vars: "off",
*/
