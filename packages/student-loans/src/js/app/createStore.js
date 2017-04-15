import * as Redux from 'redux'
import ReduxThunk from 'redux-thunk'
import {composeReducer} from '@jneander/state-utils/es/reducers'
import authReducer from '../shared/auth/authReducer'
import loanReducer from '../shared/loans/loanReducer'
import routingReducer from '../shared/routing/routingReducer'
import settingReducer from '../shared/settings/settingReducer'
import EventMachine from '../shared/EventMachine'
import AuthAccessor from '../shared/auth/AuthAccessor'
import LoanAccessor from '../shared/loans/LoanAccessor'
import SettingAccessor from '../shared/settings/SettingAccessor'

const rootReducer = composeReducer([
  authReducer,
  loanReducer,
  routingReducer,
  settingReducer
])

const initialState = {
  ...AuthAccessor.getInitialState(),
  ...LoanAccessor.getInitialState(),
  ...SettingAccessor.getInitialState()
}

const createStoreWithMiddleware = Redux.applyMiddleware(ReduxThunk)(Redux.createStore)

export default function createStore() {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  EventMachine.create(store, initialState)
  return store
}
