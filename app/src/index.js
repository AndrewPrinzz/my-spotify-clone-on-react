import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {QueryClient, QueryClientProvider, useQueryClient} from 'react-query'
import {AppProviders} from './context/app-providers'

/* 
  🕸️ Useful links: 🕸️
  1. 😀 get emoji: https://getemoji.com/
  2. 🎶 Spotify web api node: https://github.com/thelinmichael/spotify-web-api-node 
*/

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)