import AuthAccessor from 'js/shared/auth/AuthAccessor';
import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import SettingAccessor from 'js/shared/settings/SettingAccessor';

const Accessor = {
  getInitialState () {
    return {
      ...AuthAccessor.getInitialState(),
      ...GoogleDataAccessor.getInitialState(),
      ...SettingAccessor.getInitialState()
    };
  }
};

export default Accessor;
