import { createStore } from 'redux-helpers/StoreHelper';
import { threadReducers } from 'redux-helpers/ReducerHelper';

import * as AccountAccessor from 'js/shared/accounts/AccountAccessor';
import accountReducer from 'js/shared/accounts/accountReducer';
import * as PlanAccessor from 'js/shared/plans/PlanAccessor';
import planReducer from 'js/shared/plans/planReducer';

import * as AppStateAccessor from './app-state/AppStateAccessor';
import appStateReducer from './app-state/appStateReducer';

const rootReducer = threadReducers([
  accountReducer,
  appStateReducer,
  planReducer
]);

const initialState = {
  ...AccountAccessor.getInitialState(),
  ...AppStateAccessor.getInitialState(),
  ...PlanAccessor.getInitialState()
};

export function create () {
  return createStore(rootReducer, initialState);
}
