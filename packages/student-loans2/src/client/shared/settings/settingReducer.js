import {thread} from '@jneander/state-utils/es/accessors'
import {buildReducer} from '@jneander/state-utils/es/reducers'

import * as SettingAccessor from './SettingAccessor'
import * as SettingActions from './SettingActions'

const handlers = {}

handlers[SettingActions.LOAD_SETTINGS_STARTED] = (state, _action) =>
  SettingAccessor.setLoadSettingsStatus(state, SettingAccessor.LOAD_SETTINGS_STARTED)

handlers[SettingActions.LOAD_SETTINGS_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => SettingAccessor.updateSettings(state, payload),
    state => SettingAccessor.setLoadSettingsStatus(state, SettingAccessor.LOAD_SETTINGS_SUCCESS)
  )

handlers[SettingActions.LOAD_SETTINGS_FAILURE] = (state, _action) =>
  SettingAccessor.setLoadSettingsStatus(state, SettingAccessor.LOAD_SETTINGS_FAILURE)

handlers[SettingActions.SAVE_SETTINGS_STARTED] = (state, _action) =>
  SettingAccessor.setSaveSettingsStatus(state, SettingAccessor.SAVE_SETTINGS_STARTED)

handlers[SettingActions.SAVE_SETTINGS_SUCCESS] = (state, _action) =>
  SettingAccessor.setSaveSettingsStatus(state, SettingAccessor.SAVE_SETTINGS_SUCCESS)

handlers[SettingActions.SAVE_SETTINGS_FAILURE] = (state, _action) =>
  SettingAccessor.setSaveSettingsStatus(state, SettingAccessor.SAVE_SETTINGS_FAILURE)

export default buildReducer(handlers)
