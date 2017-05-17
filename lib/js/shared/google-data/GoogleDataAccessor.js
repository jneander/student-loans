const GoogleDataAccessor = {
  getInitialState () {
    return {
      googleData: {
        listFilesState: 'idle',
        files: []
      }
    };
  },

  setFiles (state, files) {
    return {
      ...state,
      googleData: {
        ...state.googleData,
        files
      }
    };
  },

  listFiles (state) {
    return state.googleData.files;
  },

  getListFilesState (state) {
    return state.googleData.listFilesState;
  },

  setListFilesState (state, listFilesState) {
    return {
      ...state,
      googleData: {
        ...state.googleData,
        listFilesState
      }
    };
  }
};

export default GoogleDataAccessor;
