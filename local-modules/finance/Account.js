import { Day } from 'units';
import { floatToDollars } from 'units/Dollars';

export default class Account {
  constructor (attr) {
    this.key = attr.key;
    this.principal = attr.principal;
    this.apr = attr.apr;
    this.minimum = attr.minimum;
    this.interest = attr.interest || 0.0;
    this.date = new Day(attr.date);
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
