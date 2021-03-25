import { Action } from './Action'
import { Thunk } from '../middlewares'

export class SetCounterAction extends Action {}
export const setCounter = (i: number): SetCounterAction => (new SetCounterAction(i))

export const slowlyDecrementCounter: () => Thunk = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      const { counter } = getState()
      dispatch(setCounter(counter - 1))
    }, 1500)
  }
}
