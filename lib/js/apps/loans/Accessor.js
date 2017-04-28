import AuthAccessor from 'js/shared/auth/AuthAccessor';

const Accessor = {
  getInitialState () {
    return {
      ...AuthAccessor.getInitialState()
    };
  }
};

export default Accessor;
