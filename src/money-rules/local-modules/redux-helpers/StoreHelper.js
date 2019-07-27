import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = Redux.applyMiddleware(ReduxThunk)(Redux.createStore);

export function createStore (reducer, initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
