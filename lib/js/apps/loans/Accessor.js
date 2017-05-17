import AuthAccessor from 'js/shared/auth/AuthAccessor';
import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';

const Accessor = {
  getInitialState () {
    return {
      ...AuthAccessor.getInitialState(),
      ...GoogleDataAccessor.getInitialState()
    };
  }
};

export default Accessor;
