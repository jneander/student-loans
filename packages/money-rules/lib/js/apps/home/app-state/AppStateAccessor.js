import Day from 'units/Day';

import { set } from 'redux-helpers/AccessorHelper';

export function getInitialState () {
  return {
    appState: {
      selectedEndDate: Day.today().offset({ years: 1 }),
      selectedStartDate: Day.today()
    }
  };
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
