import AuthAccessor from 'js/shared/auth/AuthAccessor';
import AuthActions from 'js/shared/auth/AuthActions';
import ReducerHelper from 'js/shared/helpers/ReducerHelper';

const handlers = {};

handlers[AuthActions.SIGN_IN_STARTED] = (state, _action) => (
  AuthAccessor.setAuthState(state, 'signingIn')
);

handlers[AuthActions.SIGN_IN_SUCCESS] = (state, _action) => (
  AuthAccessor.setAuthState(state, 'signedIn')
);

handlers[AuthActions.SIGN_IN_FAILURE] = (state, _action) => (
  AuthAccessor.setAuthState(state, 'signInFailure')
);

handlers[AuthActions.SIGN_OUT_STARTED] = (state, _action) => (
  AuthAccessor.setAuthState(state, 'signingOut')
);

handlers[AuthActions.SIGN_OUT_SUCCESS] = (state, _action) => (
  AuthAccessor.setAuthState(state, 'signedOut')
);

handlers[AuthActions.SIGN_OUT_FAILURE] = (state, _action) => (
  AuthAccessor.setAuthState(state, 'signOutFailure')
);

export default ReducerHelper.buildReducer(handlers);
