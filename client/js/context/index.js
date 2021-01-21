import React from 'react'

// Import context providers

const ContextProvider = ({ children }) => {
  // Render context providers nested
  return (
    <>
      {children}
    </>
  )
}

export default ContextProvider
