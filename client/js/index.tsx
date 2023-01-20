/* eslint-disable import/first */
// Webpack hot module replacement
module.hot?.accept()

import React from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from './App'
import { ContextProvider } from './context'

const root = ReactDOM.createRoot(
  document.getElementById('root') as Element
)

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)
