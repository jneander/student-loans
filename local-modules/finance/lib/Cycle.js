import Day from 'units/Day';
import DayRange from 'units/DayRange';
import MapCache from 'utils/lib/MapCache';

export default class Cycle {
  static create (day, startDate) {
    let validDay = Math.min(28, Math.max(1, parseInt(day, 10)));
    validDay = isNaN(validDay) ? 1 : validDay;
    let date = new Day(startDate);
    // TODO validate date
    while (date.day !== validDay) {
      date = date.offsetDay(-1);
    }
    return new Cycle({ startDate: date });
  }

  constructor (options = {}) {
    this._options = { ...options };

    this._options.startDay = options.startDay || 1;
    this._startDate = new Day(options.startDate);
    this._cache = new MapCache();
  }

  forDate (date) {
    const startDate = new Day(this._startDate).offsetMonth(-1);
    return new Cycle({ startDate });
  }

  get lastCycle () {
    const startDate = new Day(this._startDate).offsetMonth(-1);
    return new Cycle({ startDate });
  }

  get nextCycle () {
    const startDate = new Day(this._startDate).offsetMonth(1);
    return new Cycle({ startDate });
  }

  get startDate () {
    return this._startDate;
  }

  get endDate () {
    return this._cache.cache('endDate', () => {
      return new Day(this.startDate).offsetMonth(1).offsetDay(-1);
    });
  }

  get dates () {
    return this._cache.cache('dates', () => {
      return new DayRange(this.startDate, this.endDate).dates;
    });
  }
}
