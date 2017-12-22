import Day from 'units/Day';
import DayRange from 'units/DayRange';
import BoundedLoop from 'utils/lib/BoundedLoop';

import DateRecord from './DateRecord';

export default class History {
  constructor () {
    this._data = {};
  }

  initRecordsForDate (date) {
    return this._data[date.toString()] = new DateRecord();
  }

  forDate (date) {
    return this._data[date.toString()] = this._data[date.toString()] || new DateRecord();
  }

  updateState (account, date) {
    this.forDate(date).setAccountState(account);
  }

  addEvent (event, date) {
    this.forDate(date).addEvent(event);
  }
}
