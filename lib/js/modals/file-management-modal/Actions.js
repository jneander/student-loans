import ActionHelper from 'js/shared/helpers/ActionHelper';
import DBFile from 'js/apps/loans/db/DBFile';
import GoogleApiClient from 'js/wrappers/GoogleApiClient';

import Accessor from 'js/modals/file-management-modal/Accessor';

const Constants = ActionHelper.createConstants([
  'LIST_FILES_STARTED',
  'LIST_FILES_SUCCESS',
  'LIST_FILES_FAILURE',
  'CREATE_FILE_STARTED',
  'CREATE_FILE_SUCCESS',
  'CREATE_FILE_FAILURE',
  'SAVE_STARTED',
  'SAVE_SUCCESS',
  'SAVE_FAILURE',
  'SELECT_FILE',
]);

const Actions = {
  ...Constants,

  initialize () {
    return function (dispatch, getState) {
      dispatch(Actions.listFiles());
    }
  },

  listFiles () {
    return function (dispatch, getState) {
      dispatch({ type: Constants.LIST_FILES_STARTED });
      GoogleApiClient.listFiles({ mimeType: DBFile.mimeType })
        .then((payload) => {
          dispatch({ type: Constants.LIST_FILES_SUCCESS, payload });
        })
        .catch((payload) => {
          dispatch({ type: Constants.LIST_FILES_FAILURE, payload });
        });
    }
  },

  createFile (name) {
    return function (dispatch, getState) {
      dispatch({ type: Constants.CREATE_FILE_STARTED });
      GoogleApiClient.createFile({ mimeType: DBFile.mimeType })
        .then((payload) => {
          dispatch({ type: Constants.CREATE_FILE_SUCCESS, payload });
        })
        .catch((payload) => {
          dispatch({ type: Constants.CREATE_FILE_FAILURE, payload });
        });
    }
  },

  setSelectedFile (file) {
    return { type: Constants.SELECT_FILE, payload: file };
  },

  save (settings) {
    return function (dispatch, getState) {
      const selectedFile = Accessor.getSelectedFile(getState());
      dispatch({ type: Constants.SAVE_STARTED });
      LocalStorage.set('settings', JSON.stringify(settings))
        .then(() => {
          dispatch({ type: Constants.SAVE_SUCCESS });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};

export default Actions;
