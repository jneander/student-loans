export default class Routing {
  constructor(router, state, onUpdate) {
    this._state = {
      activity: router.match('/'),
      ...state
    }

    this._router = router

    this._update = state => {
      onUpdate(new Routing(router, {...this._state, ...state}, onUpdate))
    }
  }

  getActivity() {
    return this._state.activity
  }

  pushLocation(location) {
    this._update({activity: this._router.match(location)})
  }
}
