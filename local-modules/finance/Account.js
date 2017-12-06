import { Day } from 'units';
import { floatToDollars } from 'units/Dollars';

export default class Account {
  constructor (attr) {
    this.apr = attr.apr;
    this.date = new Day(attr.date);
    this.interest = attr.interest || 0.0;
    this.key = attr.key;
    this.minimum = attr.minimum;
    this.principal = attr.principal;
  }

  clone () {
    return new Account({
      apr: this.apr,
      date: this.date.date(),
      interest: this.interest,
      key: this.key,
      minimum: this.minimum,
      principal: this.principal
    });
  }

  getPrincipal () {
    return this.principal;
  }

  getMinimumPayment () {
    return Math.min(this.principal, this.minimum);
  }

  getMaximumPayment () {
    return this.principal + this.interest;
  }

  getCurrentPrincipal () {
    return this.principal;
  }

  getCurrentInterest () {
    return this.interest;
  }

  reducePrincipal (amount) {
    this.principal -= amount;
  }

  reduceInterest (amount) {
    this.interest -= amount;
  }

  applyInterest (days) {
    var periodRate = !!days ? (this.apr * days / 365) : this.apr / 12;
    this.interest += floatToDollars(this.principal * periodRate);
  }
}
