import { MS_PER_DAY } from './Constants';

export default class Day {
  static today = function () {
    const today = new Date();
    return new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  };

  constructor (date) {
    if (date instanceof Day) {
      this._date = date._date;
    } else {
      this._date = date instanceof Date ? date : new Date(date);
    }
  }

  date () {
    return this._date;
  }

  toString () {
    const month = `${this._date.getMonth() + 1}`.padStart(2, '0');
    const day = `${this._date.getDate()}`.padStart(2, '0');
    return `${this._date.getFullYear()}/${month}/${day}`;
  }

  toJSON () {
    return this.toString();
  }

  isOnOrBefore (day) {
    return this._date && day._date && this._date <= day._date;
  }

  isOnOrAfter (day) {
    return this._date && day._date && this._date >= day._date;
  }

  equals (day) {
    return this.toString() === day.toString();
  }

  daysApartFrom (day) {
    return Math.floor(Math.abs(this._date - day._date) / MS_PER_DAY);
  }

  offset (options) {
    const date = new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate());

    if (Number.isFinite(options.years)) {
      date.setFullYear(date.getFullYear() + options.years);
    }

    if (Number.isFinite(options.months)) {
      date.setMonth(date.getMonth() + options.months);
    }

    if (Number.isFinite(options.days)) {
      date.setDate(date.getDate() + options.days);
    }

    return new Day(date);
  }
}
