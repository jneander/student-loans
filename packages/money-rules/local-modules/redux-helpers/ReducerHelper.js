function validateHandlers (handlers) {
  console.assert(!(undefined in handlers), '"undefined" is not a valid action type');
}

export function buildReducer (handlers) {
  validateHandlers(handlers);

  // TODO: perform try/catch and surface any exceptions
  // * reducer handlers currently swallow exceptions
  return function (state, action) {
    if (!action.type) {
      return state;
    }
    const handler = handlers[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };
}

export function threadReducers (reducers) {
  return function threadedReducer (state, action) {
    return reducers.reduce((updatedState, reducer) => reducer(updatedState, action), state);
  }
}
