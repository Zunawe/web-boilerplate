import React, { FC, ReactNode, createContext } from 'react'

import { useEnhancedReducer } from '../hooks'
import { type Dispatch } from './types'
import { thunkMiddleware } from './middlewares'
import { reducer } from './reducers/app'

export interface State {
  counter: number
}

const initialState: State = {
  counter: 0
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext<[State, Dispatch, () => State]>([initialState, () => {}, () => initialState])

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  // Add middlewares here
  const store = useEnhancedReducer(reducer, initialState, undefined, [thunkMiddleware])

  return (
    <AppContext.Provider value={[store.state, store.dispatch, store.getState]}>
      {children}
    </AppContext.Provider>
  )
}
