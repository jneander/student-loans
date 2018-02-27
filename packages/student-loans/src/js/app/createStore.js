import * as Redux from 'redux'
import ReduxThunk from 'redux-thunk'
import {composeReducer} from '@jneander/state-utils/es/reducers'

import * as AuthAccessor from '../shared/auth/AuthAccessor'
import authReducer from '../shared/auth/authReducer'
import * as LoanAccessor from '../shared/loans/LoanAccessor'
import loanReducer from '../shared/loans/loanReducer'
import routingReducer from '../shared/routing/routingReducer'
import * as SettingAccessor from '../shared/settings/SettingAccessor'
import settingReducer from '../shared/settings/settingReducer'

const rootReducer = composeReducer([authReducer, loanReducer, routingReducer, settingReducer])

const initialState = {
  ...AuthAccessor.getInitialState(),
  ...LoanAccessor.getInitialState(),
  ...SettingAccessor.getInitialState()
}

const createStoreWithMiddleware = Redux.applyMiddleware(ReduxThunk)(Redux.createStore)

export default function createStore() {
  return createStoreWithMiddleware(rootReducer, initialState)
}
