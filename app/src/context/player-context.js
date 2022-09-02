import React from "react"

const PlayerContext = React.createContext()
PlayerContext.displayName = 'PlayerContext'

function PlayerProvider(props) {
  const [player, setPlayer] = React.useState()

  const value = [player, setPlayer]

  return <PlayerContext.Provider value={value} {...props} />
}

function usePlayer() {
  const context = React.useContext(PlayerContext)
  if (!context) {
    throw new Error(`Player must be rendered within the PlayerProvider`)
  }
  return context
}

const OffsetContext = React.createContext()
OffsetContext.displayName = 'OffsetContext'

function OffsetProvider(props) {
  const [offset, setOffset] = React.useState()

  const value = [offset, setOffset]

  return <OffsetContext.Provider value={value} {...props} />
}

function useOffset() {
  
  const context = React.useContext(OffsetContext)
  if (!context) {
    throw new Error(`Offset must be rendered within the OffsetProvider`)
  }
  return context
}

export {
  PlayerProvider,
  usePlayer,
  OffsetProvider,
  useOffset,
}