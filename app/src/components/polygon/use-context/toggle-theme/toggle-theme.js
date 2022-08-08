import React from 'react'
import {FunctionContextComponent} from 'components/polygon/use-context/toggle-theme/function-context-component'
// import {ClassContextComponent} from 'components/polygon/use-context/toggle-theme/class-context-component'
import {ThemeProvider} from 'components/polygon/use-context/toggle-theme/theme-context'

function ToggleTheme() {
  return (
    <>
      <ThemeProvider>
        <FunctionContextComponent />
        {/* <ClassContextComponent /> */}
      </ThemeProvider>
    </>
  )
}

export {ToggleTheme}