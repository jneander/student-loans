import { Day } from 'units';
import { floatToDollars } from 'units/Dollars';

// TODO: separate state from account
export default class Account {
  constructor (attr) {
    this.apr = attr.apr;
    this.interest = attr.interest || 0.0;
    this.key = attr.key;
    this.lastPaymentDate = attr.lastPaymentDate != null ? new Day(attr.lastPaymentDate) : null;
    this.minimumPayment = attr.minimumPayment;
    this.principal = attr.principal != null ? attr.principal : attr.originalPrincipal;
  }

  clone () {
    return new Account(this.toJSON());
  }

  toJSON () {
    return {
      apr: this.apr,
      interest: this.interest,
      key: this.key,
      lastPaymentDate: this.lastPaymentDate != null ? this.lastPaymentDate.toString() : null,
      minimumPayment: this.minimumPayment,
      principal: this.principal
    };
  }

  getMinimumPayment () {
    return Math.min(this.principal, this.minimumPayment);
  }

  setPrincipal (amount) {
    this.principal = amount;
  }

  getPrincipal () {
    return this.principal;
  }

  setInterest (amount) {
    this.interest = amount;
  }

  getInterest () {
    return this.interest;
  }

  adjustPrincipal (amount) {
    this.principal += amount;
  }

  adjustInterest (amount) {
    this.interest += amount;
  }

  applyInterest (days) {
    this.interest += floatToDollars(this.principal * (this.apr * days / 365));
  }

  setLastPaymentDate (date) {
    this.lastPaymentDate = new Day(date);
  }

  getLastPaymentDate () {
    return this.lastPaymentDate;
  }
}
