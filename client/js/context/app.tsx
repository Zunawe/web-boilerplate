import React, { FC, createContext, useReducer, useCallback } from 'react'

import { reducer } from '../reducers/app'

const initialState: AppState = {
  counter: 0
}

export const AppContext = createContext<[AppState, Dispatch]>([initialState, () => {}])

export const AppContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const combinedDispatch = useCallback((action: Action | Thunk) => {
    if (typeof action === 'function') {
      action(combinedDispatch, () => state)
    } else {
      dispatch(action)
    }
  }, [dispatch])

  return (
    <AppContext.Provider value={[state, combinedDispatch]}>
      {children}
    </AppContext.Provider>
  )
}
