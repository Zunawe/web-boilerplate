import { SetCounterAction } from '../actions/app'

export const reducer = (state: AppState, action: Action): AppState => {
  if (action instanceof SetCounterAction) {
    return {
      ...state,
      counter: action.payload
    }
  }
  return state
}
