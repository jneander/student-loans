import AccessorHelper from 'js/shared/helpers/AccessorHelper';

const GoogleDataAccessor = {
  getInitialState () {
    return {
      settings: {
        loadSettingsStatus: 'idle',
        saveSettingsStatus: 'idle',
        settings: {}
      }
    };
  },

  getSettings (state) {
    return state.settings.settings;
  },

  updateSettings (state, settings) {
    return AccessorHelper.merge(state, 'settings.settings', settings);
  },

  getLoadSettingsStatus (state) {
    return state.settings.loadSettingsStatus;
  },

  setLoadSettingsStatus (state, status) {
    return AccessorHelper.set(state, 'settings.loadSettingsStatus', status);
  },

  getSaveSettingsStatus (state) {
    return state.settings.saveSettingsStatus;
  },

  setSaveSettingsStatus (state, status) {
    return AccessorHelper.set(state, 'settings.saveSettingsStatus', status);
  }
};

export default GoogleDataAccessor;
