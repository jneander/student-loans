import ActionHelper from 'js/shared/helpers/ActionHelper';
import FirebaseClient from 'js/wrappers/FirebaseClient';

const Constants = ActionHelper.createConstants([
  'INITIALIZE_STARTED',
  'INITIALIZE_SUCCESS',
  'INITIALIZE_FAILURE',
  'SIGN_IN_STARTED',
  'SIGN_IN_SUCCESS',
  'SIGN_IN_FAILURE',
  'SIGN_OUT_STARTED',
  'SIGN_OUT_SUCCESS',
  'SIGN_OUT_FAILURE'
]);

const AuthActions = {
  ...Constants,

  initialize () {
    return function (dispatch, getState) {
      dispatch({ type: Constants.INITIALIZE_STARTED });
      FirebaseClient.restoreSession()
        .then((isSignedIn) => {
          if (isSignedIn) {
            dispatch({ type: Constants.SIGN_IN_SUCCESS });
          }
          dispatch({ type: Constants.INITIALIZE_SUCCESS });
        })
        .catch((error) => {
          dispatch({ type: Constants.INITIALIZE_FAILURE, payload: error });
        });
    }
  },

  signIn () {
    return function (dispatch, getState) {
      FirebaseClient.signIn();
    }
  },

  signOut () {
    return function (dispatch, getState) {
      dispatch({ type: Constants.SIGN_OUT_STARTED });
      FirebaseClient.signOut()
        .then(() => {
          dispatch({ type: Constants.SIGN_OUT_SUCCESS });
        })
        .catch((error) => {
          dispatch({ type: Constants.SIGN_OUT_FAILURE });
        });
    }
  }
};

export default AuthActions;
