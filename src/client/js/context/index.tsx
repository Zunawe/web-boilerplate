import React, { FC, ReactNode } from 'react'

// Import context providers

interface ContextProviderProps {
  children: ReactNode
}

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  // Render context providers nested
  return (
    <>
      {children}
    </>
  )
}

export default ContextProvider
