export const SET_PROJECTION_TYPE = 'SET_PROJECTION_TYPE';
export const SET_SELECTED_END_DATE = 'SET_SELECTED_END_DATE';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SET_SELECTED_START_DATE = 'SET_SELECTED_START_DATE';

export function setProjectionType (projectionType) {
  return { type: SET_PROJECTION_TYPE, payload: { projectionType } };
}

export function setSelectedEndDate (date) {
  return { type: SET_SELECTED_END_DATE, payload: { date } };
}

export function setSelectedDate (date) {
  return { type: SET_SELECTED_DATE, payload: { date } };
}

export function setSelectedStartDate (date) {
  return { type: SET_SELECTED_START_DATE, payload: { date } };
}
