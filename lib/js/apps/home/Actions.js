import * as PlanActions from 'js/shared/plans/PlanActions';
import * as AccountActions from 'js/shared/accounts/AccountActions';

export function initialize () {
  return function (dispatch, getState) {
    dispatch(AccountActions.initialize());
    dispatch(PlanActions.initialize());
  }
}
