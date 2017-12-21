import Budget from 'finance/lib/Budget';
import Cycle from 'finance/lib/Cycle';
import Projection from 'finance/lib/Projection';
import Month from 'units/Month';
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
    const cycleStartDate = Month.thisMonth().startDate;
    const endDate = cycleStartDate.offsetYear(10).offsetDay(-1);

    const projection = new Projection({
      accounts: accounts.map(account => account.clone()),//.slice(0, 1),
      budget: new Budget({ balance: budget, refreshAmount: budget }),
      cycle: new Cycle({ startDate: cycleStartDate, startDay: 1 }),
      endDate
    });

    projection.run().then(() => {
      dispatch({
        type: SET_PROJECTION,
        payload: { projection }
      });
    });
  }
}

export function updateBudget (budget) {
  return function (dispatch, _getState) {
    dispatch(setBudget(budget));
  }
}
