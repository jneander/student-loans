import AuthActions from 'js/shared/auth/AuthActions';

const Actions = {
  initialize () {
    return function (dispatch, getState) {
      dispatch(AuthActions.initialize());
    }
  }
};

export default Actions;
