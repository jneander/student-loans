import * as AuthActions from '../shared/auth/AuthActions'
import * as RoutingActions from '../shared/routing/RoutingActions'
import * as SettingActions from '../shared/settings/SettingActions'

export function initialize() {
  return (dispatch, getState) => {
    dispatch(RoutingActions.initialize())
    dispatch(AuthActions.initialize())
    dispatch(SettingActions.initialize())
  }
}
