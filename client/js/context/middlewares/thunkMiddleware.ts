export type Thunk = (dispatch: Dispatch, getState: () => State) => void

export const thunkMiddleware: Middleware = ({ state, dispatch, getState }) => (next) => (action: Action | Thunk) => {
  if (typeof action === 'function') {
    action(dispatch, getState)
  } else {
    next(action)
  }
}
