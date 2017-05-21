import Accessor from 'js/modals/file-management-modal/Accessor';
import Actions from 'js/modals/file-management-modal/Actions';
import AccessorHelper from 'js/shared/helpers/AccessorHelper';
import ReducerHelper from 'js/shared/helpers/ReducerHelper';

const handlers = {};

handlers[Actions.LIST_FILES_STARTED] = (state, _action) => (
  Accessor.setListFilesStatus(state, 'started')
);

handlers[Actions.LIST_FILES_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => Accessor.setFiles(state, payload.result.files),
    state => Accessor.setListFilesStatus(state, 'success')
  )
);

handlers[Actions.LIST_FILES_FAILURE] = (state, _action) => (
  Accessor.setListFilesStatus(state, 'failure')
);

handlers[Actions.CREATE_FILE_STARTED] = (state, _action) => (
  Accessor.setCreateFileStatus(state, 'started')
);

handlers[Actions.CREATE_FILE_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => Accessor.updateFile(state, payload.result),
    state => Accessor.setCreateFileStatus(state, 'success')
  )
);

handlers[Actions.CREATE_FILE_FAILURE] = (state, _action) => (
  Accessor.setCreateFileStatus(state, 'failure')
);

handlers[Actions.SAVE_STARTED] = (state, _action) => (
  Accessor.setSaveStatus(state, 'started')
);

handlers[Actions.SAVE_SUCCESS] = (state, _action) => (
  Accessor.setSaveStatus(state, 'success')
);

handlers[Actions.SAVE_FAILURE] = (state, _action) => (
  Accessor.setSaveStatus(state, 'failure')
);

handlers[Actions.SELECT_FILE] = (state, { payload }) => (
  Accessor.setSelectedFile(state, payload)
);

export default ReducerHelper.buildReducer(handlers);
