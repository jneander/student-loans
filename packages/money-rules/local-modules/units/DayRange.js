import MapCache from 'utils/lib/MapCache';
import Day from 'units/Day';

export default class DayRange {
  constructor (startDate, endDate) {
    this._startDate = new Day(startDate);
    this._endDate = new Day(endDate);
    this._cache = new MapCache();
  }

  get startDate () {
    return this._startDate;
  }

  get endDate () {
    return this._endDate;
  }

  get dates () {
    return this._cache.cache('dates', () => {
      const dates = [];
      let date = this.startDate;
      while (date.isOnOrBefore(this.endDate)) {
        dates.push(date);
        date = date.offsetDay(1);
      }
      return dates;
    });
  }

  get length () {
    return this.dates.length;
  }
}
