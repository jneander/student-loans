import AuthActions from 'js/shared/auth/AuthActions';
import RoutingActions from 'js/shared/routing/RoutingActions';
import SettingActions from 'js/shared/settings/SettingActions';

const Actions = {
  initialize () {
    return function (dispatch, getState) {
      dispatch(RoutingActions.initialize());
      dispatch(AuthActions.initialize());
      dispatch(SettingActions.initialize());
    }
  }
};

export default Actions;
