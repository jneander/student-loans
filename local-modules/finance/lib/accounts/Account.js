import { Day } from 'units';

export default class Account {
  constructor (attr) {
    this._attr = {
      ...attr,
      originationDate: new Day(attr.originationDate),
      updateDate: Day.from(attr.updateDate)
    };
  }

  get key () {
    return this._attr.key;
  }

  get name () {
    return this._attr.name;
  }

  get dailyInterest () {
    return 0;
  }

  get balance () {
    return this._attr.balance;
  }

  adjustBalance (amount) {
    this._attr.balance += amount;
  }

  get maximumContribution () {
    return Infinity;
  }

  set updateDate (date) {
    this._attr.updateDate = Day.from(date);
  }

  get updateDate () {
    return this._attr.updateDate;
  }

  clone () {
    return new this.constructor(this._attr);
  }

  toJSON () {
    return { ...this._attr };
  }
}
