import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import GoogleDataActions from 'js/shared/google-data/GoogleDataActions';
import AccessorHelper from 'js/shared/helpers/AccessorHelper';
import ReducerHelper from 'js/shared/helpers/ReducerHelper';

const handlers = {};

handlers[GoogleDataActions.LIST_FILES_STARTED] = (state, _action) => (
  GoogleDataAccessor.setListFilesState(state, 'started')
);

handlers[GoogleDataActions.LIST_FILES_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => GoogleDataAccessor.setFiles(state, payload.result.files),
    state => GoogleDataAccessor.setListFilesState(state, 'success')
  )
);

handlers[GoogleDataActions.LIST_FILES_FAILURE] = (state, _action) => (
  GoogleDataAccessor.setListFilesState(state, 'failure')
);

export default ReducerHelper.buildReducer(handlers);
