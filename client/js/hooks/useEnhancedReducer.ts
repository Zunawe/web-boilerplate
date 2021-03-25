import { useCallback, useReducer, useRef } from 'react'

export const useEnhancedReducer = (reducer: Reducer, initialState: State, initializer?: (arg: State) => State, middlewares?: Middleware[]): Store => {
  // Use the useRef hook and a wrapped reducer to intercept the state changes
  // Every time the reducer is called, we save an extra copy of the store
  // so we can refer to our copy in the getState function
  const prevState = useRef(initialState)
  const getState = useCallback(() => prevState.current, [])

  const newReducer: Reducer = (state, action) => {
    prevState.current = reducer(state, action)
    return prevState.current
  }

  const [state, originalDispatch] = useReducer(newReducer, initialState, initializer ?? (() => initialState))

  const store: Store = {
    state,
    dispatch: originalDispatch,
    getState
  }

  const enhancedDispatch = middlewares === undefined ? originalDispatch : middlewares.reduceRight((acc, middleware) => middleware(store)(acc), originalDispatch)

  return {
    ...store,
    dispatch: enhancedDispatch
  }
}
