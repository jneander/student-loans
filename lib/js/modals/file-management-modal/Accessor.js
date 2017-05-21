import AccessorHelper from 'js/shared/helpers/AccessorHelper';
import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import SettingAccessor from 'js/shared/settings/SettingAccessor';

const Accessor = {
  getInitialState () {
    return {
      ...GoogleDataAccessor.getInitialState(),
      ...SettingAccessor.getInitialState(),
      modal: {
        listFilesStatus: 'idle',
        createFileStatus: 'idle',
        files: {},
        selectedFile: null
      }
    };
  },

  setFiles (state, files) {
    const fileMap = files.reduce((map, file) => ({ ...map, [file.id]: file }), {});
    return AccessorHelper.set(state, 'modal.files', fileMap);
  },

  listFiles (state) {
    return Object.values(state.modal.files);
  },

  getListFilesStatus (state) {
    return state.modal.listFilesStatus;
  },

  setListFilesStatus (state, status) {
    return AccessorHelper.set(state, 'modal.listFilesStatus', status);
  },

  getCreateFileStatus (state) {
    return state.modal.createFileStatus;
  },

  setCreateFileStatus (state, status) {
    return AccessorHelper.set(state, 'modal.createFileStatus', status);
  },

  getSelectedFile (state) {
    return state.modal.selectedFile;
  },

  setSelectedFile (state, file) {
    return AccessorHelper.set(state, 'modal.selectedFile', file);
  }
};

export default Accessor;
