import {merge, set} from '@jneander/state-utils/es/accessors'

export const LOAD_SETTINGS_FAILURE = Symbol('LOAD_SETTINGS_FAILURE')
export const LOAD_SETTINGS_STARTED = Symbol('LOAD_SETTINGS_STARTED')
export const LOAD_SETTINGS_SUCCESS = Symbol('LOAD_SETTINGS_SUCCESS')
export const SAVE_SETTINGS_FAILURE = Symbol('SAVE_SETTINGS_FAILURE')
export const SAVE_SETTINGS_STARTED = Symbol('SAVE_SETTINGS_STARTED')
export const SAVE_SETTINGS_SUCCESS = Symbol('SAVE_SETTINGS_SUCCESS')

export function getInitialState() {
  return {
    settings: {
      loadSettingsStatus: 'idle',
      saveSettingsStatus: 'idle',
      settings: {}
    }
  }
}

export function getSettings(state) {
  return state.settings.settings
}

export function updateSettings(state, settings) {
  return merge(state, 'settings.settings', settings)
}

export function getLoadSettingsStatus(state) {
  return state.settings.loadSettingsStatus
}

export function setLoadSettingsStatus(state, status) {
  return set(state, 'settings.loadSettingsStatus', status)
}

export function getSaveSettingsStatus(state) {
  return state.settings.saveSettingsStatus
}

export function setSaveSettingsStatus(state, status) {
  return set(state, 'settings.saveSettingsStatus', status)
}
