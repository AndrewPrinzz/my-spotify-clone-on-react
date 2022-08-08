/** @jsxImportSource @emotion/react */
import {jsx} from '@emotion/react'

import React from 'react'

function List({getItems}) {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    console.log('Updating items')
    setItems(getItems())
  }, [getItems])

  return items.map(item => <div style={{color: 'inherit'}} key={item}>{item}</div>)
}

function Theme() {
  const [number, setNumber] = React.useState(1)
  const [dark, setDark] = React.useState(false)

  const getItems = React.useCallback(() => {
    return [number, number + 1, number + 2]
  }, [number])

  const theme = {
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF' : '#333'
  }

  return (
    <div style={theme} css={{minHeight: '150px', width: '150px'}}>
      <input 
        css={{color: '#000'}}
        type="number"
        value={number}
        onChange={e => setNumber(parseInt(e.target.value))}
      />
      <button
        css={{color: '#000'}}
        onClick={() => setDark(prevDark => !prevDark)}
      >
        Toggle theme
      </button>
      <List getItems={getItems} />
    </div>
  )
}

export {Theme}