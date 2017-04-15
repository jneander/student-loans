import * as AuthActions from 'js/shared/auth/AuthActions'
import * as RoutingActions from 'js/shared/routing/RoutingActions'
import * as SettingActions from 'js/shared/settings/SettingActions'

export function initialize() {
  return (dispatch, getState) => {
    dispatch(RoutingActions.initialize())
    dispatch(AuthActions.initialize())
    dispatch(SettingActions.initialize())
  }
}
