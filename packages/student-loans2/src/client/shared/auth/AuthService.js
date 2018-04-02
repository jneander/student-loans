import {getAuthState} from './AuthAccessor'

export default class AuthService {
  static create(store) {
    const service = new AuthService(store)
    service.listen()
    return service
  }

  constructor(store) {
    this.store = store
    this.onStateChange = this.onStateChange.bind(this)
    this.currentState = store.getState()
    this.handling = false
  }

  listen() {
    this.store.subscribe(() => {
      const nextState = this.store.getState()
      this.onStateChange(this.currentState, nextState)
      this.currentState = nextState
    })
  }

  onStateChange(lastState, nextState) {
    if (!this.handling) {
      this.handling = true
      this.handleAuthStateChange(lastState, nextState)
      this.handling = false
    }
  }

  handleAuthStateChange(lastState, nextState) {
    const lastAuthState = getAuthState(lastState)
    const nextAuthState = getAuthState(nextState)

    if (lastAuthState === nextAuthState) {
      return
    }
  }
}
