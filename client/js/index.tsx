/* eslint-disable import/first */
// Webpack hot module replacement
module.hot?.accept()

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import { ContextProvider } from './context'

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
)
