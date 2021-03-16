import { Action } from './index'

export class SetCounterAction extends Action {}
export const setCounter = (i: number): SetCounterAction => (new SetCounterAction(i))
