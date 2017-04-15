import {buildReducer} from '@jneander/state-utils/es/reducers'

import {
  SIGNED_IN,
  SIGNED_OUT,
  SIGNING_IN,
  SIGNING_OUT,
  SIGN_IN_FAILURE,
  SIGN_OUT_FAILURE,
  setAuthState
} from './AuthAccessor'
import * as AuthActions from './AuthActions'

const handlers = {}

handlers[AuthActions.SIGN_IN_STARTED] = (state, _action) => setAuthState(state, SIGNING_IN)

handlers[AuthActions.SIGN_IN_SUCCESS] = (state, _action) => setAuthState(state, SIGNED_IN)

handlers[AuthActions.SIGN_IN_FAILURE] = (state, _action) => setAuthState(state, SIGN_IN_FAILURE)

handlers[AuthActions.SIGN_OUT_STARTED] = (state, _action) => setAuthState(state, SIGNING_OUT)

handlers[AuthActions.SIGN_OUT_SUCCESS] = (state, _action) => setAuthState(state, SIGNED_OUT)

handlers[AuthActions.SIGN_OUT_FAILURE] = (state, _action) => setAuthState(state, SIGN_OUT_FAILURE)

export default buildReducer(handlers)
