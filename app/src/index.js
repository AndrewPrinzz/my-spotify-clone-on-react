import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

/* 
  🕸️ Useful links: 🕸️
  1. 😀 get emoji: https://getemoji.com/
  2. 🎶 Spotify web api node: https://github.com/thelinmichael/spotify-web-api-node 
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)