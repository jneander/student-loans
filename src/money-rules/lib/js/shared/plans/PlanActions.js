import Budget from 'finance/lib/Budget';
import Cycle from 'finance/lib/Cycle';
import Projection from 'finance/lib/Projection';
import Strategy from 'finance/lib/Strategy';
import Month from 'units/Month';

import { getAccountList } from 'js/shared/accounts/AccountAccessor';
import { getBudget, getDebtStrategy, getPendingProjection, getStartDate } from 'js/shared/plans/PlanAccessor';

export const SET_BUDGET = 'SET_BUDGET';
export const SET_DEBT_STRATEGY = 'SET_DEBT_STRATEGY';
export const SET_PROJECTION = 'SET_PROJECTION';
export const SET_PENDING_PROJECTION = 'SET_PENDING_PROJECTION';
export const GRADUATE_PENDING_PROJECTION = 'GRADUATE_PENDING_PROJECTION';

export function setBudget (budget) {
  return { type: SET_BUDGET, payload: { budget } };
}

export function setDebtStrategy (debtStrategy) {
  return { type: SET_DEBT_STRATEGY, payload: { debtStrategy } };
}

export function initialize () {
  return function (dispatch, getState) {
    // nothing here yet
  }
}

export function projectPlan () {
  return function (dispatch, getState) {
    const state = getState();

    let projection = getPendingProjection(state);
    if (projection) {
      projection.abort();
    }

    const accounts = getAccountList(state);
    const budget = getBudget(state);
    const cycleStartDate = Month.thisMonth().startDate;
    const endDate = cycleStartDate.offsetYear(10).offsetDay(-1);
    const debtStrategy = getDebtStrategy(state);

    const strategy = new Strategy({ debtPriority: debtStrategy });

    projection = new Projection({
      accounts: accounts.map(account => account.clone()),//.slice(0, 1),
      budget: new Budget({ balance: budget.currentAmount, refreshAmount: budget.refreshAmount }),
      cycle: new Cycle({ startDate: cycleStartDate, startDay: 1 }),
      endDate,
      strategy
    });

    dispatch({
      type: SET_PENDING_PROJECTION,
      payload: { projection }
    });

    projection.run().then(() => {
      dispatch(graduatePendingProjection());
    });
  }
}

export function graduatePendingProjection () {
  return { type: GRADUATE_PENDING_PROJECTION };
}

export function updateBudget (budget) {
  return function (dispatch, _getState) {
    dispatch(setBudget(budget));
  }
}
