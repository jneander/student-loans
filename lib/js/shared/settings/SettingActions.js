import ActionHelper from 'js/shared/helpers/ActionHelper';
import LocalStorage from 'js/wrappers/LocalStorage';

const Constants = ActionHelper.createConstants([
  'LOAD_SETTINGS_STARTED',
  'LOAD_SETTINGS_SUCCESS',
  'LOAD_SETTINGS_FAILURE',
  'SAVE_SETTINGS_STARTED',
  'SAVE_SETTINGS_SUCCESS',
  'SAVE_SETTINGS_FAILURE'
]);

const Actions = {
  ...Constants,

  initialize () {
    return function (dispatch, getState) {
      dispatch(Actions.loadSettings());
    }
  },

  loadSettings () {
    return function (dispatch, getState) {
      dispatch({ type: Constants.LOAD_SETTINGS_STARTED });
      LocalStorage.get('settings')
        .then((settings) => {
          dispatch({ type: Constants.LOAD_SETTINGS_SUCCESS, payload: JSON.parse(settings) });
        })
        .catch((error) => {
          console.error(error);
          dispatch({ type: Constants.LOAD_SETTINGS_SUCCESS, payload: error });
        });
    }
  },

  saveSettings (settings) {
    return function (dispatch, getState) {
      dispatch({ type: Constants.SAVE_SETTINGS_STARTED });
      LocalStorage.set('settings', JSON.stringify(settings))
        .then(() => {
          dispatch({ type: Constants.SAVE_SETTINGS_SUCCESS });
        })
        .catch((error) => {
          console.error(error);
          dispatch({ type: Constants.SAVE_SETTINGS_FAILURE, payload: error });
        });
    }
  }
};

export default Actions;
