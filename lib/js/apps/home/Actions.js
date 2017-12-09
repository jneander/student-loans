import * as PlanActions from 'js/shared/plans/PlanActions';

export function initialize () {
  return function (dispatch, getState) {
    dispatch(PlanActions.projectPlan());
  }
}
