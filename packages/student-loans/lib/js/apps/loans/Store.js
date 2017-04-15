import {composeReducer} from 'js/shared/helpers/ReducerHelper'
import StoreHelper from 'js/shared/helpers/StoreHelper'
import authReducer from 'js/shared/auth/authReducer'
import loanReducer from 'js/shared/loans/loanReducer'
import routingReducer from 'js/shared/routing/routingReducer'
import settingReducer from 'js/shared/settings/settingReducer'
import EventMachine from 'js/shared/EventMachine'

import Accessor from 'js/apps/loans/Accessor'
import reducer from 'js/apps/loans/reducer'

const rootReducer = composeReducer([
  authReducer,
  loanReducer,
  routingReducer,
  settingReducer,
  reducer
])

export function createStore() {
  const initialState = Accessor.getInitialState()
  const store = StoreHelper.createStore(rootReducer, initialState)
  EventMachine.create(store, initialState)
  return store
}

export default {
  create: createStore
}
