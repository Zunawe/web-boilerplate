import React, { FC, ReactNode } from 'react'

// Import context providers

interface ContextProviderProps {
  children: ReactNode
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  // Render context providers nested
  return (
    <>
      {children}
    </>
  )
}
