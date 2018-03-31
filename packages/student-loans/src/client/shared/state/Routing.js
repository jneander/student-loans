import History from '../../../shared/wrappers/History'

import router from '../../router'

export default class Routing {
  constructor(store) {
    this._store = store
    this._history = new History()

    const {path, query} = this._history.getCurrentLocation()

    this._store.setState({
      routing: {
        activity: router.match(path, query),
      }
    })

    this._get = () => this._store.getState().routing

    this._update = state => {
      const {routing} = this._store.getState()
      this._store.setState({
        routing: {...routing, ...state}
      })
    }
  }

  initialize() {
    this._history.listen(({path, query}) => {
      const activity = router.match(path, query)
      this._update({activity})
    })
  }

  uninitialize() {
    this._history.unlisten()
  }

  getActivity() {
    return this._get().activity
  }

  pushLocation(location) {
    this._history.pushLocation(location)
  }
}
