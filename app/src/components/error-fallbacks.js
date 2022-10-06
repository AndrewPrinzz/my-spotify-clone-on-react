/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import * as colors from 'styles/colors'

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

function ErrorMessage({error, variant = 'stacked', ...props}) {
  console.log('error: ', error);
  return (
    <div
      role="alert"
      className={css([{ color: colors.danger }, errorMessageVariants[variant]])}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        className={css([
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ])}
      >
        {error.message}
      </pre>
    </div>
  )
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      className={css({
        color: colors.danger,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export {FullPageErrorFallback, ErrorMessage}