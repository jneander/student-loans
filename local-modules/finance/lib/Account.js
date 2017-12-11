import { Day } from 'units';

// TODO: separate state from account
export default class Account {
  constructor (attr) {
    this._attr = {
      ...attr,
      apr: attr.apr || 0.0,
      interest: attr.interest || 0.0,
      lastPaymentDate: attr.lastPaymentDate != null ? new Day(attr.lastPaymentDate) : null,
      originationDate: new Day(attr.originationDate),
      principal: attr.principal != null ? attr.principal : attr.originalPrincipal
    };
  }

  get key () {
    return this._attr.key;
  }

  get apr () {
    return this._attr.apr;
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

  setLastPaymentDate (date) {
    this._attr.lastPaymentDate = new Day(date);
  }

  getLastPaymentDate () {
    return this._attr.lastPaymentDate;
  }

  clone () {
    return new Account(this._attr);
  }

  toJSON () {
    return { ...this._attr };
  }
}
