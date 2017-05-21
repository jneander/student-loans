import SettingAccessor from 'js/shared/settings/SettingAccessor';
import SettingActions from 'js/shared/settings/SettingActions';
import AccessorHelper from 'js/shared/helpers/AccessorHelper';
import ReducerHelper from 'js/shared/helpers/ReducerHelper';

const handlers = {};

handlers[SettingActions.LOAD_SETTINGS_STARTED] = (state, _action) => (
  SettingAccessor.setLoadSettingsStatus(state, 'started')
);

handlers[SettingActions.LOAD_SETTINGS_SUCCESS] = (currentState, { payload }) => (
  AccessorHelper.thread(
    currentState,
    state => SettingAccessor.updateSettings(state, payload),
    state => SettingAccessor.setLoadSettingsStatus(state, 'success')
  )
);

handlers[SettingActions.LOAD_SETTINGS_FAILURE] = (state, _action) => (
  SettingAccessor.setLoadSettingsStatus(state, 'failure')
);

handlers[SettingActions.SAVE_SETTINGS_STARTED] = (state, _action) => (
  SettingAccessor.setSaveSettingsStatus(state, 'started')
);

handlers[SettingActions.SAVE_SETTINGS_SUCCESS] = (state, _action) => (
  SettingAccessor.setSaveSettingsStatus(state, 'success')
);

handlers[SettingActions.SAVE_SETTINGS_FAILURE] = (state, _action) => (
  SettingAccessor.setSaveSettingsStatus(state, 'failure')
);

export default ReducerHelper.buildReducer(handlers);
