import Day from 'units/Day';

import { set } from 'redux-helpers/AccessorHelper';

export function getInitialState () {
  return {
    appState: {
      projectionType: 'totalBalance',
      selectedEndDate: Day.today().offset({ years: 10 }),
      selectedStartDate: Day.today().offset({ years: -1 })
    }
  };
}

export function setProjectionType (state, projectionType) {
  return set(state, 'appState.projectionType', projectionType);
}

export function getProjectionType (state) {
  return state.appState.projectionType;
}

export function setSelectedEndDate (state, date) {
  return set(state, 'appState.selectedEndDate', date);
}

export function getSelectedEndDate (state) {
  return state.appState.selectedEndDate;
}

export function setSelectedStartDate (state, date) {
  return set(state, 'appState.selectedStartDate', date);
}

export function getSelectedStartDate (state) {
  return state.appState.selectedStartDate;
}
