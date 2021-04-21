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

  // dispatchContainer is an object referenced from the wrapped dispatch in the store
  // By default, the dispatch it contains throws an error warning that the middlewares haven't
  // been added. Once the middlewares are chained properly, it is updated, which means
  // when the middlewares call store.dispatch, it will call the first middleware instead

  // Without the container, the dispatch called from a middleware depends on whether store.dispatch
  // is accessed before or after the middlewares are chained (i.e. destructuring when writing middlewares)
  const dispatchContainer: { dispatch: Dispatch } = {
    dispatch: () => { throw new Error('You can\'t call dispatch from here') }
  }

  const store: Store = {
    state,
    dispatch: (...args) => dispatchContainer.dispatch(...args),
    getState
  }

  middlewares = middlewares ?? []
  dispatchContainer.dispatch = middlewares
    .map((middleware) => middleware(store))
    .reduce((prevMiddleware, nextMiddleware) => (next) => prevMiddleware(nextMiddleware(next)))(originalDispatch)

  return store
}
