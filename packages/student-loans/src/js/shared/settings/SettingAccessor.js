import {merge, set} from '@jneander/state-utils/es/accessors'

const GoogleDataAccessor = {
  getInitialState() {
    return {
      settings: {
        loadSettingsStatus: 'idle',
        saveSettingsStatus: 'idle',
        settings: {}
      }
    }
  },

  getSettings(state) {
    return state.settings.settings
  },

  updateSettings(state, settings) {
    return merge(state, 'settings.settings', settings)
  },

  getLoadSettingsStatus(state) {
    return state.settings.loadSettingsStatus
  },

  setLoadSettingsStatus(state, status) {
    return set(state, 'settings.loadSettingsStatus', status)
  },

  getSaveSettingsStatus(state) {
    return state.settings.saveSettingsStatus
  },

  setSaveSettingsStatus(state, status) {
    return set(state, 'settings.saveSettingsStatus', status)
  }
}

export default GoogleDataAccessor
