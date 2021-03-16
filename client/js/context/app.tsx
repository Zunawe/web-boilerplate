import React, { FC, createContext, useReducer } from 'react'

import { useThunkableDispatch } from '../hooks'
import { reducer } from '../reducers/app'

const initialState: AppState = {
  counter: 0
}

export const AppContext = createContext<[AppState, Dispatch]>([initialState, () => {}])

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const combinedDispatch = useThunkableDispatch(state, dispatch)

  return (
    <AppContext.Provider value={[state, combinedDispatch]}>
      {children}
    </AppContext.Provider>
  )
}
