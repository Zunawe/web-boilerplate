import React, { FC, useContext } from 'react'

import { setCounter, slowlyDecrementCounter } from '../context/actions/app'
import { Button } from '../components'
import { AppContext } from '../context/app'

export const Root: FC = () => {
  const [state, dispatch] = useContext(AppContext)

  const handleClick = (): void => {
    dispatch(setCounter(state.counter + 1))
    dispatch(slowlyDecrementCounter())
  }

  return (
    <Button onClick={handleClick}>Counter: {state.counter}</Button>
  )
}
