import React, { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import config from '../../config/config.json'
import { Root } from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
], {
  basename: config.basePath
})

export const App: FC = () => {
  return (
    <RouterProvider router={router} />
  )
}
