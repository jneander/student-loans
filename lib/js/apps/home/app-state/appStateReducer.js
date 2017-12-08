import { buildReducer } from 'redux-helpers/ReducerHelper';

import { setSelectedDate } from './AppStateAccessor';
import { SET_SELECTED_DATE } from './AppStateActions';

const handlers = {};

handlers[SET_SELECTED_DATE] = (state, { payload }) => (
  setSelectedDate(state, payload.date)
);

export default buildReducer(handlers);
