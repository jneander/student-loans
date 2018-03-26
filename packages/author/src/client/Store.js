export default class Store {
  constructor() {
    this._listeners = []
    this._state = {}

    this._inTransaction = false
    this._isBroadcasting = false
  }

  get inTransaction() {
    return this._inTransaction
  }

  set inTransaction(state) {
    this._inTransaction = state
  }

  get isBroadcasting() {
    return this._isBroadcasting
  }

  set isBroadcasting(state) {
    this._isBroadcasting = state
  }

  getState() {
    return this._state
  }

  setState(state) {
    if (this.isBroadcasting) {
      console.warn('Store cannot be updated while publishing updates to listeners.')
      return
    }

    this._state = {
      ...this._state,
      ...state
    }
    if (!this.inTransaction) {
      this.updateListeners()
    }
  }

  subscribe(listenerFn) {
    this._listeners.push(listenerFn)
    return () => {
      this._listeners = this._listeners.filter(fn => fn !== listenerFn)
    }
  }

  transaction(updateFn) {
    this.inTransaction = true
    updateFn()
    this.inTransaction = false
    this.updateListeners()
  }

  updateListeners() {
    if (!this.inTransaction && !this.isBroadcasting) {
      this.isBroadcasting = true
      const listeners = [...this._listeners]
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]()
      }
      this.isBroadcasting = false
    }
  }
}
