import { Day } from 'units';

// TODO: separate state from account
export default class Account {
  constructor (attr) {
    this._attr = {
      ...attr,
      apr: attr.apr || 0.0,
      interest: attr.interest || 0.0,
      lastPaymentDate: Day.from(attr.lastPaymentDate),
      nextPaymentDate: Day.from(attr.nextPaymentDate),
      originationDate: new Day(attr.originationDate),
      principal: attr.principal != null ? attr.principal : attr.originalPrincipal,
      updateDate: Day.from(attr.updateDate)
    };
  }

  get key () {
    return this._attr.key;
  }

  get apr () {
    return this._attr.apr;
  }

  get willAccrueInterest () {
    return this._attr.principal != 0;
  }

  get requiredContribution () {
    return Math.min(this._attr.principal, this._attr.minimumPayment);
  }

  getMinimumPayment () {
    return Math.min(this._attr.principal, this._attr.minimumPayment);
  }

  setPrincipal (amount) {
    this._attr.principal = amount;
  }

  getPrincipal () {
    return this._attr.principal;
  }

  setInterest (amount) {
    this._attr.interest = amount;
  }

  getInterest () {
    return this._attr.interest;
  }

  adjustPrincipal (amount) {
    this._attr.principal += amount;
  }

  adjustInterest (amount) {
    this._attr.interest += amount;
  }

  set lastPaymentDate (date) {
    this._attr.lastPaymentDate = Day.from(date);
  }

  get lastPaymentDate () {
    return this._attr.lastPaymentDate;
  }

  setLastPaymentDate (date) {
    this._attr.lastPaymentDate = Day.from(date);
  }

  getLastPaymentDate () {
    return this._attr.lastPaymentDate;
  }

  set nextPaymentDate (date) {
    this._attr.nextPaymentDate = Day.from(date);
  }

  get nextPaymentDate () {
    return this._attr.nextPaymentDate;
  }

  setNextPaymentDate (date) {
    this._attr.nextPaymentDate = Day.from(date);
  }

  getNextPaymentDate () {
    return this._attr.nextPaymentDate;
  }

  get expectsPayment () {
    return !!this._attr.nextPaymentDate;
  }

  set updateDate (date) {
    this._attr.updateDate = Day.from(date);
  }

  get updateDate () {
    return this._attr.updateDate;
  }

  clone () {
    return new Account(this._attr);
  }

  toJSON () {
    return { ...this._attr };
  }
}
