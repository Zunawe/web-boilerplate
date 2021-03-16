import React, { FC, ReactNode } from 'react'

import { AppContextProvider } from './app'

interface ContextProviderProps {
  children: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return (
    <AppContextProvider>
      {children}
    </AppContextProvider>
  )
}
