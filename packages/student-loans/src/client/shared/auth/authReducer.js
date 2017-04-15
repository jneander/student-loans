import {buildReducer} from '@jneander/state-utils/es/reducers'

import AuthAccessor from './AuthAccessor'
import * as AuthActions from './AuthActions'

const handlers = {}

handlers[AuthActions.SIGN_IN_STARTED] = (state, _action) =>
  AuthAccessor.setAuthState(state, 'signingIn')

handlers[AuthActions.SIGN_IN_SUCCESS] = (state, _action) =>
  AuthAccessor.setAuthState(state, 'signedIn')

handlers[AuthActions.SIGN_IN_FAILURE] = (state, _action) =>
  AuthAccessor.setAuthState(state, 'signInFailure')

handlers[AuthActions.SIGN_OUT_STARTED] = (state, _action) =>
  AuthAccessor.setAuthState(state, 'signingOut')

handlers[AuthActions.SIGN_OUT_SUCCESS] = (state, _action) =>
  AuthAccessor.setAuthState(state, 'signedOut')

handlers[AuthActions.SIGN_OUT_FAILURE] = (state, _action) =>
  AuthAccessor.setAuthState(state, 'signOutFailure')

export default buildReducer(handlers)
