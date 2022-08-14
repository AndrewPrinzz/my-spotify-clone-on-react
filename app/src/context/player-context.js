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

export {
  PlayerProvider,
  usePlayer
}