import { buildReducer } from 'redux-helpers/ReducerHelper';

import { setSelectedEndDate, setSelectedStartDate } from './AppStateAccessor';
import { SET_SELECTED_END_DATE, SET_SELECTED_START_DATE } from './AppStateActions';

const handlers = {};

handlers[SET_SELECTED_END_DATE] = (state, { payload }) => (
  setSelectedEndDate(state, payload.date)
);

handlers[SET_SELECTED_START_DATE] = (state, { payload }) => (
  setSelectedStartDate(state, payload.date)
);

export default buildReducer(handlers);
