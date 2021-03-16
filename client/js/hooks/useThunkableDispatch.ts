import React from 'react'

export const useThunkableDispatch = (state: State, dispatch: React.Dispatch<Action>): Dispatch => {
  const thunkableDispatch: Dispatch = (action) => {
    if (typeof action === 'function') {
      action(thunkableDispatch, () => state)
    } else {
      dispatch(action)
    }
  }

  return thunkableDispatch
}
