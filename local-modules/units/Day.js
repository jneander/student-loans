import { MS_PER_DAY } from './Constants';

export default class Day {
  static today = function () {
    const today = new Date();
    return new Day(new Date(today.getYear(), today.getMonth(), today.getDate()));
  };

  constructor (date) {
    this._date = date;
  }

  date () {
    return this._date;
  }

  year () {
    return this._year;
  }

  month () {
    return this._month;
  }

  day () {
    return this._day;
  }

  isOnOrBefore (day) {
    return this._date && day._date && this._date <= day._date;
  }

  isOnOrAfter (day) {
    return this._date && day._date && this._date >= day._date;
  }

  equals (day) {
    return !(this._date < day._date || this._date > day._date);
  }

  daysApartFrom (day) {
    return Math.abs(this._date - day._date) / MS_PER_DAY;
  }
}
