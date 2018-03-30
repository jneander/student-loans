import History from '../../../shared/wrappers/History'

export default class Routing {
  constructor(router, state, onUpdate) {
    this._history = new History()

    const {path, query} = this._history.getCurrentLocation()

    this._state = {
      activity: router.match(path, query),
      ...state
    }

    this._router = router

    this._update = state => {
      onUpdate(new Routing(router, {...this._state, ...state}, onUpdate))
    }
  }

  initialize() {
    this._history.listen(({path, query}) => {
      const activity = this._router.match(path, query)
      this._update({activity})
    })
  }

  uninitialize() {
    this._history.unlisten()
  }

  getActivity() {
    return this._state.activity
  }

  pushLocation(location) {
    this._history.pushLocation(location)
  }
}
