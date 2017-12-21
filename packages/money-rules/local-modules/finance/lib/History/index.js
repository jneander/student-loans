import Day from 'units/Day';
import DayRange from 'units/DayRange';
import BoundedLoop from 'utils/lib/BoundedLoop';

import HistoryRecord from './HistoryRecord';

export default class History {
  constructor () {
    this._data = {
      recordsByDate: {}
    };
  }

  initRecordsForDate (date) {
    return this._data.recordsByDate[date.toString()] = new HistoryRecord(date);
  }

  getRecordsOnDate (date) {
    return this._data.recordsByDate[date.toString()];
  }

  updateState (account, date) {
    const records = this._data.recordsByDate[date.toString()]
    records.setAccountRecord(account);
  }

  addEvent (event, date) {
    const records = this._data.recordsByDate[date.toString()]
    records.addEvent(event);
  }

  getStateOnDate (date) {
    const records = this._data.recordsByDate[date.toString()];
    return records ? records.state : {};
  }

  getEventsOnDate (date) {
    const records = this._data.recordsByDate[date.toString()];
    return records ? records.events : [];
  }
}
