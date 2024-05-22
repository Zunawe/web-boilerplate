import { type State } from './app'
import { type Action } from './actions/Action'

export interface Store {
  state: State
  dispatch: Dispatch
  getState: () => State
}

export type Reducer = (state: State, action: Action) => State
export type Dispatch = ((...args: any[]) => void)
export type Middleware = (store: Store) => (next: Dispatch) => Dispatch
