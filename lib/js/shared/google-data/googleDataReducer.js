import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import GoogleDataActions from 'js/shared/google-data/GoogleDataActions';
import AccessorHelper from 'js/shared/helpers/AccessorHelper';
import ReducerHelper from 'js/shared/helpers/ReducerHelper';

const handlers = {};

handlers[GoogleDataActions.LIST_FILES_STARTED] = (state, _action) => (
  GoogleDataAccessor.setListFilesStatus(state, 'started')
);

handlers[GoogleDataActions.LIST_FILES_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => GoogleDataAccessor.setFiles(state, payload.result.files),
    state => GoogleDataAccessor.setListFilesStatus(state, 'success')
  )
);

handlers[GoogleDataActions.LIST_FILES_FAILURE] = (state, _action) => (
  GoogleDataAccessor.setListFilesStatus(state, 'failure')
);

handlers[GoogleDataActions.CREATE_FILE_STARTED] = (state, _action) => (
  GoogleDataAccessor.setCreateFileStatus(state, 'started')
);

handlers[GoogleDataActions.CREATE_FILE_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => GoogleDataAccessor.updateFile(state, payload.result),
    state => GoogleDataAccessor.setCreateFileStatus(state, 'success')
  )
);

handlers[GoogleDataActions.CREATE_FILE_FAILURE] = (state, _action) => (
  GoogleDataAccessor.setCreateFileStatus(state, 'failure')
);

handlers[GoogleDataActions.UPDATE_FILE_STARTED] = (state, _action) => (
  GoogleDataAccessor.setUpdateFileStatus(state, 'started')
);

handlers[GoogleDataActions.UPDATE_FILE_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => GoogleDataAccessor.updateFile(state, payload.result),
    state => GoogleDataAccessor.setUpdateFileStatus(state, 'success')
  )
);

handlers[GoogleDataActions.UPDATE_FILE_FAILURE] = (state, _action) => (
  GoogleDataAccessor.setUpdateFileStatus(state, 'failure')
);

export default ReducerHelper.buildReducer(handlers);
