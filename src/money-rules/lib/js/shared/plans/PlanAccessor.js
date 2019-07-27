import { thisMonth } from 'units/Dates';

import { set } from 'redux-helpers/AccessorHelper';

export function getInitialState () {
  return {
    plan: {
      budget: {
        currentAmount: 100,
        refreshAmount: 1300, // TODO: start at 0
      },
      debtStrategy: 'custom',
      pendingProjection: null,
      projection: null,
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

export function setDebtStrategy (state, debtStrategy) {
  return set(state, 'plan.debtStrategy', debtStrategy);
}

export function getDebtStrategy (state) {
  return state.plan.debtStrategy;
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

export function setPendingProjection (state, projection) {
  return set(state, 'plan.pendingProjection', projection);
}

export function getProjection (state) {
  return state.plan.projection;
}

export function getPendingProjection (state) {
  return state.plan.pendingProjection;
}

export function graduatePendingProjection (state) {
  const nextState = setPendingProjection(state, null);
  return setProjection(nextState, getPendingProjection(state));
}
