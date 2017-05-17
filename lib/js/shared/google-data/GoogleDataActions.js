import DBFile from 'js/apps/loans/db/DBFile';
import ActionHelper from 'js/shared/helpers/ActionHelper';
import GoogleApiClient from 'js/wrappers/GoogleApiClient';

const Constants = ActionHelper.createConstants([
  'LIST_FILES_STARTED',
  'LIST_FILES_SUCCESS',
  'LIST_FILES_FAILURE'
]);

const GoogleDataActions = {
  ...Constants,

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
  }
};

export default GoogleDataActions;
