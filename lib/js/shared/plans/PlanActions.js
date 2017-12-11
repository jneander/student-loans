import Projection from 'finance/Projection';
import { getAccountList } from 'js/shared/accounts/AccountAccessor';
import { getBudget, getStartDate } from 'js/shared/plans/PlanAccessor';

export const SET_BUDGET = 'SET_BUDGET';
export const SET_PROJECTION = 'SET_PROJECTION';

export function setBudget (budget) {
  return { type: SET_BUDGET, payload: { budget } };
}

export function initialize () {
  return function (dispatch, getState) {
    // nothing here yet
  }
}

export function projectPlan () {
  return function (dispatch, getState) {
    const state = getState();

    const accounts = getAccountList(state);
    const budget = getBudget(state);
    const startDate = getStartDate(state);

    const projection = new Projection({ accounts, budget, startDate });
    projection.run();

    dispatch({
      type: SET_PROJECTION,
      payload: { projection }
    });
  }
}

export function updateBudget (budget) {
  return function (dispatch, _getState) {
    dispatch(setBudget(budget));
    dispatch(projectPlan());
  }
}
