import * as Redux from 'redux'
import ReduxThunk from 'redux-thunk'
import {composeReducer} from '@jneander/state-utils/es/reducers'
import * as AuthAccessor from '../shared/auth/AuthAccessor'
import authReducer from '../shared/auth/authReducer'

const rootReducer = composeReducer([
  authReducer
])

const initialState = {
  ...AuthAccessor.getInitialState()
}

const createStoreWithMiddleware = Redux.applyMiddleware(ReduxThunk)(Redux.createStore)

export default function createStore() {
  return createStoreWithMiddleware(rootReducer, initialState)
}
