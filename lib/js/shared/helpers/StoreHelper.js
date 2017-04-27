import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const StoreHelper = {
  createStore (reducer, initialState, enhancer) {
    return createStoreWithMiddleware(reducer, initialState, enhancer);
  }
};

export default StoreHelper;
