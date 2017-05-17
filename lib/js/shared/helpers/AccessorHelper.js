const AccessorHelper = {
  thread (state, ...accessors) {
    return accessors.reduce((updatedState, accessor) => accessor(updatedState), state);
  }
};

export default AccessorHelper;
