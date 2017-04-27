import ReducerHelper from 'js/shared/helpers/ReducerHelper';
import StoreHelper from 'js/shared/helpers/StoreHelper';
import authReducer from 'js/shared/auth/authReducer';
import Accessor from 'js/Accessor';
import reducer from 'js/reducer';

const rootReducer = ReducerHelper.compose([
  authReducer,
  reducer
]);

const Store = {
  create () {
    return StoreHelper.createStore(rootReducer, Accessor.getInitialState());
  }
};

export default Store;
