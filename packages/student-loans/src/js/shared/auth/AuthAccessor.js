export const SIGNED_IN = Symbol('SIGNED_IN')
export const SIGNED_OUT = Symbol('SIGNED_OUT')
export const SIGNING_IN = Symbol('SIGNING_IN')
export const SIGNING_OUT = Symbol('SIGNING_OUT')
export const SIGN_IN_FAILURE = Symbol('SIGN_IN_FAILURE')
export const SIGN_OUT_FAILURE = Symbol('SIGN_OUT_FAILURE')

export function getInitialState() {
  return {
    auth: {
      authState: SIGNED_OUT
    }
  }
}

export function getAuthState(state) {
  return state.auth.authState
}

export function setAuthState(state, authState) {
  return {
    ...state,
    auth: {
      ...state.auth,
      authState
    }
  }
}
