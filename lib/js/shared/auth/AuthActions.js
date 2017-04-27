import ActionHelper from 'js/shared/helpers/ActionHelper';
import GoogleApiClient from 'js/wrappers/GoogleApiClient';

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
  initialize () {
    return function (dispatch, getState) {
      GoogleApiClient.initialize()
        .then(() => {

        })
        .catch((error) => {

        });
    }
  },

  signIn () {
    return function (dispatch, getState) {
      GoogleApiClient.signIn()
        .then(() => {

        })
        .catch((error) => {

        });
    }
  },

  signOut () {
    return function (dispatch, getState) {
      GoogleApiClient.signOut()
        .then(() => {

        })
        .catch((error) => {

        });
    }
  }
};

export default AuthActions;
