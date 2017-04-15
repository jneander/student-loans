import {buildReducer} from 'js/shared/helpers/ReducerHelper'
import * as RoutingActions from 'js/shared/routing/RoutingActions'

const handlers = {}

handlers[RoutingActions.SET_ACTIVITY] = (state, { payload }) => (
  { ...state, activity: payload }
)

export default buildReducer(handlers)
