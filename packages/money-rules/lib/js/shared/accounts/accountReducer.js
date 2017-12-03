import { buildReducer } from 'redux-helpers/ReducerHelper';

import { addAccounts } from './AccountAccessor';
import { ADD_ACCOUNTS } from './AccountActions';

const handlers = {};

handlers[ADD_ACCOUNTS] = (state, { payload }) => (
  addAccounts(state, payload.accounts)
);

export default buildReducer(handlers);
