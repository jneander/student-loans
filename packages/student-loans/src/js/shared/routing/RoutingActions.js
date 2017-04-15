import Router from 'js/app/loans/Router'
import {History} from '@jneander/activity-routing-history'

const history = new History()

export const SET_ACTIVITY = 'SET_ACTIVITY'

export function initialize() {
  return function(dispatch, getState) {
    history.listen(({path, query}) => {
      const activity = Router.match(path, query)
      dispatch(setActivity(activity))
    })
    const location = history.getCurrentLocation()
    const activity = Router.match(location.path, location.query)
    dispatch(setActivity(activity))
  }
}

export function teardown() {
  history.unlisten()
}

export function setActivity(payload) {
  return {type: SET_ACTIVITY, payload}
}

export function pushLocation(location) {
  return function() {
    history.pushLocation(location)
  }
}

export function pushQuery(query, merge = false) {
  return function() {
    const location = history.getCurrentLocation()
    let newQuery = query
    if (merge) {
      newQuery = {...location.query, query}
    }
    history.pushLocation({...location, query: newQuery})
  }
}

export function replaceLocation(location) {
  return function() {
    history.replaceLocation(location)
  }
}

export function replaceQuery(query, merge = false) {
  return function() {
    const location = history.getCurrentLocation()
    let newQuery = query
    if (merge) {
      newQuery = {...location.query, query}
    }
    history.replaceLocation({...location, query: newQuery})
  }
}
