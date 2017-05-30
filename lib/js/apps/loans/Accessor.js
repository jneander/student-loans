import AuthAccessor from 'js/shared/auth/AuthAccessor';
import LoanAccessor from 'js/shared/loans/LoanAccessor';
import SettingAccessor from 'js/shared/settings/SettingAccessor';

const Accessor = {
  getInitialState () {
    return {
      ...AuthAccessor.getInitialState(),
      ...LoanAccessor.getInitialState(),
      ...SettingAccessor.getInitialState()
    };
  }
};

export default Accessor;
