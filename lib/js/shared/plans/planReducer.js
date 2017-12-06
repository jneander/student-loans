import { buildReducer } from 'redux-helpers/ReducerHelper';

import { setBudget, setProjection } from './PlanAccessor';
import { SET_BUDGET, SET_PROJECTION } from './PlanActions';

const handlers = {};

handlers[SET_BUDGET] = (state, { payload }) => (
  setBudget(state, payload.budget)
);

handlers[SET_PROJECTION] = (state, { payload }) => (
  setProjection(state, payload.projection)
);

export default buildReducer(handlers);
