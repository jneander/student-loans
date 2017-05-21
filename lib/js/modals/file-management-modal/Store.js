import ReducerHelper from 'js/shared/helpers/ReducerHelper';
import StoreHelper from 'js/shared/helpers/StoreHelper';
import Accessor from 'js/modals/file-management-modal/Accessor';
import settingReducer from 'js/shared/settings/settingReducer';
import reducer from 'js/modals/file-management-modal/reducer';

const rootReducer = ReducerHelper.compose([
  settingReducer,
  reducer
]);

const Store = {
  create () {
    return StoreHelper.createStore(rootReducer, Accessor.getInitialState());
  }
};

export default Store;
