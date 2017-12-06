import { createStore } from 'redux-helpers/StoreHelper';
import { threadReducers } from 'redux-helpers/ReducerHelper';

import * as AccountAccessor from 'js/shared/accounts/AccountAccessor';
import accountReducer from 'js/shared/accounts/accountReducer';
import * as PlanAccessor from 'js/shared/plans/PlanAccessor';
import planReducer from 'js/shared/plans/planReducer';

const rootReducer = threadReducers([
  accountReducer,
  planReducer
]);

const initialState = {
  ...AccountAccessor.getInitialState(),
  ...PlanAccessor.getInitialState()
};

export function create () {
  return createStore(rootReducer, initialState);
}
