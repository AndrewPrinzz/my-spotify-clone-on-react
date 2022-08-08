import React from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

function useTheme() {
  return React.useContext(ThemeContext)
}

function useThemeUpdate() {
  return React.useContext(ThemeUpdateContext)
}

function ThemeProvider({children}) {
  // creating our state
  const [darkTheme, setDarkTheme] = React.useState(true)
  
  // updating our state
  function toggleTheme() {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  // persisting both of different values down into our children
  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )  
}

export {ThemeProvider, useTheme, useThemeUpdate}