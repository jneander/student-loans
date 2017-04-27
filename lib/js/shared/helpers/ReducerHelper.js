function validateHandlers (handlers) {
  // eslint-disable-next no-console
  console.assert(!(undefined in handlers), '"undefined" is not a valid action type');
}

const ReducerHelper = {
  buildReducer (handlers) {
    validateHandlers(handlers);

    return function (state, action) {
      try {
        if (!action.type) {
          return state;
        }
        const handler = handlers[action.type];
        if (handler) {
          return handler(state, action);
        }
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
      return state;
    };
  },

  compose (reducers) {
    return function composedReducer (state, action) {
      return reducers.reduce((updatedState, reducer) => reducer(updatedState, action), state);
    };
  }
};

export default ReducerHelper;
