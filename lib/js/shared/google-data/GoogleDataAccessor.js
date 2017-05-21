import AccessorHelper from 'js/shared/helpers/AccessorHelper';

const GoogleDataAccessor = {
  getInitialState () {
    return {
      googleData: {
        listFilesStatus: 'idle',
        createFileStatus: 'idle',
        updateFileStatus: 'idle',
        files: {}
      }
    };
  },

  setFiles (state, files) {
    const fileMap = files.reduce((map, file) => ({ ...map, [file.id]: file }), {});
    return AccessorHelper.set(state, 'googleData.files', fileMap);
  },

  listFiles (state) {
    return Object.values(state.googleData.files);
  },

  updateFile (state, file) {
    return AccessorHelper.merge(state, 'googleData.files', { [file.id]: file });
  },

  getListFilesStatus (state) {
    return state.googleData.listFilesStatus;
  },

  setListFilesStatus (state, status) {
    return AccessorHelper.set(state, 'googleData.listFilesStatus', status);
  },

  getCreateFileStatus (state) {
    return state.googleData.createFileStatus;
  },

  setCreateFileStatus (state, status) {
    return AccessorHelper.set(state, 'googleData.createFileStatus', status);
  },

  getUpdateFileStatus (state) {
    return state.googleData.updateFileStatus;
  },

  setUpdateFileStatus (state, status) {
    return AccessorHelper.set(state, 'googleData.updateFileStatus', status);
  }
};

export default GoogleDataAccessor;
