declare abstract class Action {
  payload?: any
  constructor (payload?: any)
}

/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
declare abstract interface State {}
declare interface AppState extends State {
  counter: number
}

declare type Thunk = (dispatch: (action: Action | Thunk) => void, getState: () => State) => void
declare type Dispatch = (action: Action | Thunk) => void
