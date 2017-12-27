import { buildReducer } from 'redux-helpers/ReducerHelper';

import {
  graduatePendingProjection, setBudget, setDebtStrategy, setPendingProjection, setProjection
} from './PlanAccessor';
import {
  GRADUATE_PENDING_PROJECTION, SET_BUDGET, SET_DEBT_STRATEGY, SET_PENDING_PROJECTION, SET_PROJECTION
} from './PlanActions';

const handlers = {};

handlers[GRADUATE_PENDING_PROJECTION] = (state) => (
  graduatePendingProjection(state)
);

handlers[SET_BUDGET] = (state, { payload }) => (
  setBudget(state, payload.budget)
);

handlers[SET_DEBT_STRATEGY] = (state, { payload }) => (
  setDebtStrategy(state, payload.debtStrategy)
);

handlers[SET_PENDING_PROJECTION] = (state, { payload }) => (
  setPendingProjection(state, payload.projection)
);

handlers[SET_PROJECTION] = (state, { payload }) => (
  setProjection(state, payload.projection)
);

export default buildReducer(handlers);
