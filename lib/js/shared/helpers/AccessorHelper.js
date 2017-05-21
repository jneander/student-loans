import _ from 'lodash/fp';

const AccessorHelper = {
  concat (state, path, data) {
    if (data.length > 0) {
      const currentData = _.get(path, state) || [];
      const updatedData = [...currentData, ...data];
      return _.set(path, updatedData, state);
    }
    return state;
  },

  get (state, path, defaultValue = undefined) {
    return _.getOr(defaultValue, path, state);
  },

  merge (state, path, datum) {
    if (Object.keys(datum).length > 0) {
      const currentData = _.get(path, state) || {};
      const updatedData = {...currentData, ...datum};
      return _.set(path, updatedData, state);
    }
    return state;
  },

  push (state, path, datum) {
    const currentData = _.get(path, state) || [];
    const updatedData = [...currentData, datum];
    return _.set(path, updatedData, state);
  },

  set (state, path, data) {
    return _.set(path, data, state);
  },

  thread (state, ...accessors) {
    return accessors.reduce((updatedState, accessor) => accessor(updatedState), state);
  }
};

export default AccessorHelper;
