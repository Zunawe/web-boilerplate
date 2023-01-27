import React, { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
])

export const App: FC = () => {
  return (
    <RouterProvider router={router} />
  )
}
