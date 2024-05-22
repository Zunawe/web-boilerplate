import { SetCounterAction } from '../actions/app'
import { type Reducer } from '../types'

export const reducer: Reducer = (state, action) => {
  if (action instanceof SetCounterAction) {
    return {
      ...state,
      counter: action.payload
    }
  }
  return state
}
