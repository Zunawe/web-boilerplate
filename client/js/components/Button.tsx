import React, { FC, ReactNode, useCallback } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    onClick?.()
  }, [onClick])

  return (
    <button onClick={handleClick}>{children}</button>
  )
}

export default Button
