import * as RoutingActions from 'js/shared/routing/RoutingActions'

export function createRoutingContext(store) {
  return {
    getActivity() {
      return store.getState().activity
    },

    pushLocation(location) {
      store.dispatch(RoutingActions.pushLocation(location))
    },

    pushQuery(query, merge = false) {
      store.dispatch(RoutingActions.pushQuery(query, merge))
    },

    replaceLocation(location) {
      store.dispatch(RoutingActions.replaceLocation(location))
    },

    replaceQuery(query, merge = false) {
      store.dispatch(RoutingActions.replaceQuery(query, merge))
    }
  }
}
