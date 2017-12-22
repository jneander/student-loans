import { MS_PER_DAY } from './Constants';
import Month from './Month';

export default class Day {
  static earliest (...dates) {
    return dates.reduce((earliest, date) => date.isBefore(earliest) ? date : earliest, dates[0]);
  }

  static from (date) {
    return date != null ? new Day(date) : null;
  }

  static today () {
    const today = new Date();
    return new Day(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  }

  static toString (date) {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${date.getFullYear()}/${month}/${day}`;
  }

  constructor (date) {
    if (date instanceof Day) {
      this._date = date._date ? new Date(date._date.getTime()) : null;
    } else {
      this._date = date instanceof Date ? date : new Date(date);
    }
  }

  date () {
    return this._date;
  }

  get year () {
    return this._date.getFullYear();
  }

  get month () {
    return this._date.getMonth() + 1;
  }

  get day () {
    return this._date.getDate();
  }

  toString () {
    return Day.toString(this._date);
  }

  toJSON () {
    return this.toString();
  }

  isAfter (day) {
    return this._date && day._date && this._date > day._date;
  }

  isBefore (day) {
    return this._date && day._date && this._date < day._date;
  }

  isOnOrAfter (day) {
    return this._date && day._date && this._date >= day._date;
  }

  isOnOrBefore (day) {
    return this._date && day._date && this._date <= day._date;
  }

  equals (day) {
    return !!day && this.toString() === day.toString();
  }

  daysApartFrom (day) {
    return Math.floor(Math.abs(this._date - day._date) / MS_PER_DAY);
  }

  offsetYear (years) {
    const lastDate = new Date(this._date.getFullYear() + years, this._date.getMonth() + 1, 0).getDate();
    const dayDate = Math.min(this._date.getDate(), lastDate);
    const date = new Date(this._date.getFullYear() + years, this._date.getMonth(), dayDate);
    return new Day(date);
  }

  offsetMonth (months) {
    const lastDate = new Date(this._date.getFullYear(), this._date.getMonth() + months + 1, 0).getDate();
    const dayDate = Math.min(this._date.getDate(), lastDate);
    const date = new Date(this._date.getFullYear(), this._date.getMonth() + months, dayDate);
    return new Day(date);
  }

  offsetDay (days) {
    const date = new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate() + days);
    return new Day(date);
  }
}
