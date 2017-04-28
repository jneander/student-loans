const AuthAccessor = {
  getInitialState () {
    return {
      auth: {
        authState: 'signedOut'
      }
    };
  },

  getAuthState (state) {
    return state.auth.authState;
  },

  setAuthState (state, authState) {
    return {
      ...state,
      auth: {
        ...state.auth,
        authState
      }
    };
  }
};

export default AuthAccessor;
