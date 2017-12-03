import { buildReducer } from 'redux-helpers/ReducerHelper';

import { setProjectionType, setSelectedEndDate, setSelectedStartDate } from './AppStateAccessor';
import { SET_PROJECTION_TYPE, SET_SELECTED_END_DATE, SET_SELECTED_START_DATE } from './AppStateActions';

const handlers = {};

handlers[SET_PROJECTION_TYPE] = (state, { payload }) => (
  setProjectionType(state, payload.projectionType)
);

handlers[SET_SELECTED_END_DATE] = (state, { payload }) => (
  setSelectedEndDate(state, payload.date)
);

handlers[SET_SELECTED_START_DATE] = (state, { payload }) => (
  setSelectedStartDate(state, payload.date)
);

export default buildReducer(handlers);
