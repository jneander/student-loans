import * as AuthActions from './shared/auth/AuthActions'

export function initialize() {
  return (dispatch, getState) => {
    dispatch(AuthActions.initialize())
  }
}
