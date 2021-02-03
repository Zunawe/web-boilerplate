import React from 'react'

// Import context providers

type PropTypes = {
  children: any
}

const ContextProvider = ({ children }: PropTypes) => {
  // Render context providers nested
  return (
    <>
      {children}
    </>
  )
}

export default ContextProvider
