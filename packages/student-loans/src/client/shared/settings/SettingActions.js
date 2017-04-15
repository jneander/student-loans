import * as LocalStorage from '../wrappers/LocalStorage'

export const LOAD_SETTINGS_STARTED = 'LOAD_SETTINGS_STARTED'
export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS'
export const LOAD_SETTINGS_FAILURE = 'LOAD_SETTINGS_FAILURE'
export const SAVE_SETTINGS_STARTED = 'SAVE_SETTINGS_STARTED'
export const SAVE_SETTINGS_SUCCESS = 'SAVE_SETTINGS_SUCCESS'
export const SAVE_SETTINGS_FAILURE = 'SAVE_SETTINGS_FAILURE'

export function loadSettings() {
  return function(dispatch, getState) {
    dispatch({type: LOAD_SETTINGS_STARTED})
    LocalStorage.get('settings')
      .then(settings => {
        dispatch({type: LOAD_SETTINGS_SUCCESS, payload: JSON.parse(settings)})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: LOAD_SETTINGS_SUCCESS, payload: error})
      })
  }
}

export function saveSettings(settings) {
  return function(dispatch, getState) {
    dispatch({type: SAVE_SETTINGS_STARTED})
    LocalStorage.set('settings', JSON.stringify(settings))
      .then(() => {
        dispatch({type: SAVE_SETTINGS_SUCCESS})
      })
      .catch(error => {
        console.error(error)
        dispatch({type: SAVE_SETTINGS_FAILURE, payload: error})
      })
  }
}

export function initialize() {
  return function(dispatch, getState) {
    dispatch(loadSettings())
  }
}
