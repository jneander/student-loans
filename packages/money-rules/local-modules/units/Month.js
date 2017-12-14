import Day from './Day';

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

    this._cacheMap = {};
    this._cache = (key, creator) => {
      if (this._cacheMap[key]) {
        return this._cacheMap[key];
      }
      this._cacheMap[key] = creator();
      return this._cacheMap[key];
    }
  }

  get length () {
    return this.dates.length;
  }

  get startDate () {
    return this._cache('startDate', () => (
      new Day(new Date(this._date.year, this._date.month - 1, 1))
    ))
  }

  get endDate () {
    return this._cache('endDate', () => (
      new Day(new Date(this._date.year, this._date.month, 0))
    ))
  }

  get dates () {
    return this._cache('dates', () => {
      const dates = [];
      let date = this.startDate;
      while (date.isOnOrBefore(this.endDate)) {
        dates.push(date);
        date = date.offsetDay(1);
      }
      return dates;
    });
  }

  get lastMonth () {
    return new Month(new Date(this._date.year, this._date.month - 2, 1));
  }

  get nextMonth () {
    return new Month(new Date(this._date.year, this._date.month, 1));
  }

  toString () {
    const month = `${this._date.month}`.padStart(2, '0');
    return `${this._date.year}/${month}`;
  }
}
