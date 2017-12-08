import { set } from 'redux-helpers/AccessorHelper';

export function getInitialState () {
  return {
    appState: {
      selectedDate: null
    }
  };
}

export function setSelectedDate (state, date) {
  return set(state, 'appState.selectedDate', date);
}

export function getSelectedDate (state) {
  return state.appState.selectedDate;
}
