export abstract class Action {
  payload?: any

  constructor (payload?: any) {
    this.payload = payload
  }
}
