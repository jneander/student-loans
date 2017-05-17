import ReducerHelper from 'js/shared/helpers/ReducerHelper';
import StoreHelper from 'js/shared/helpers/StoreHelper';
import authReducer from 'js/shared/auth/authReducer';
import googleDataReducer from 'js/shared/google-data/googleDataReducer';
import routingReducer from 'js/shared/routing/routingReducer';
import Accessor from 'js/apps/loans/Accessor';
import reducer from 'js/apps/loans/reducer';

const rootReducer = ReducerHelper.compose([
  authReducer,
  googleDataReducer,
  routingReducer,
  reducer
]);

const Store = {
  create () {
    return StoreHelper.createStore(rootReducer, Accessor.getInitialState());
  }
};

export default Store;
