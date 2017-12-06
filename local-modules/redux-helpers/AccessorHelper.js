import _ from 'lodash/fp';

export function concat (state, path, data) {
  if (data.length > 0) {
    const currentData = _.get(path, state) || [];
    const updatedData = [...currentData, ...data];
    return _.set(path, updatedData, state);
  }
  return state;
}

export function get (state, path, defaultValue = undefined) {
  return _.getOr(defaultValue, path, state);
}

export function merge (state, path, datum) {
  if (Object.keys(datum).length > 0) {
    const currentData = _.get(path, state) || {};
    const updatedData = {...currentData, ...datum};
    return _.set(path, updatedData, state);
  }
  return state;
}

export function push (state, path, datum) {
  const currentData = _.get(path, state) || [];
  const updatedData = [...currentData, datum];
  return _.set(path, updatedData, state);
}

export function set (state, path, data) {
  return _.set(path, data, state);
}

export function thread (state, ...accessors) {
  return accessors.reduce((updatedState, accessor) => accessor(updatedState), state);
}
