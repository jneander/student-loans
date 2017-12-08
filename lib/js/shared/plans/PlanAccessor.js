import { Projection } from 'finance';
import { thisMonth } from 'units/Dates';

import accounts from 'js/apps/home/accounts';
const projection = new Projection(accounts, 1300, thisMonth());
projection.run();

//

import { set } from 'redux-helpers/AccessorHelper';

export function getInitialState () {
  return {
    plan: {
      budget: 1300, // TODO: start at 0
      projection,
      startDate: thisMonth()
    }
  };
}

export function setBudget (state, budget) {
  return set(state, 'plan.budget', budget);
}

export function getBudget (state) {
  return state.plan.budget;
}

export function setStartDate (state, startDate) {
  return set(state, 'plan.startDate', budget);
}

export function getStartDate (state) {
  return state.plan.startDate;
}

export function setProjection (state, projection) {
  return set(state, 'plan.projection', projection);
}

export function getProjection (state) {
  return state.plan.projection;
}
