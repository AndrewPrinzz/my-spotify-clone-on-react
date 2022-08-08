import {Link} from 'react-router-dom'
import {css} from '@emotion/react'

function NotFoundScreen() {
  return (
    <div
      className={css`
        height: 100%;
        display: grid;
        alignItems: center;
        justifyContent: center;
      `}
    >
      <div>
        Sorry... Nothing here. <Link to="/">Go home</Link>
      </div>
    </div>
  )
}

export {NotFoundScreen}