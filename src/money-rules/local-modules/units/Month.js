import MapCache from 'utils/lib/MapCache';
import Day from './Day';
import DayRange from './DayRange';

export default class Month {
  static thisMonth () {
    return new Month(new Date());
  }

  static lastMonth () {
    return new Month(new Date()).lastMonth;
  }

  static nextMonth () {
    return new Month(new Date()).nextMonth;
  }

  constructor (date) {
    this._date = new Day(date);
    this._cache = new MapCache();
  }

  get length () {
    return this.dates.length;
  }

  get startDate () {
    return this._cache.cache('startDate', () => (
      new Day(new Date(this._date.year, this._date.month - 1, 1))
    ))
  }

  get endDate () {
    return this._cache.cache('endDate', () => (
      new Day(new Date(this._date.year, this._date.month, 0))
    ))
  }

  get dates () {
    return this._cache.cache('dates', () => {
      return new DayRange(this.startDate, this.endDate).dates;
    });
  }

  get lastMonth () {
    return new Month(new Date(this._date.year, this._date.month - 2, 1));
  }

  get nextMonth () {
    return new Month(new Date(this._date.year, this._date.month, 1));
  }

  getDate (day) {
    const lastDate = new Date(this._date.year, this._date.month, 0).getDate();
    return new Day(new Date(this._date.year, this._date.month - 1, Math.min(day, lastDate)));
  }

  toString () {
    const month = `${this._date.month}`.padStart(2, '0');
    return `${this._date.year}/${month}`;
  }
}
