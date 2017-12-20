import Day from 'units/Day';

import Account from './Account';

export default class LoanAccount extends Account {
  constructor (attr) {
    super(attr);

    this.nextContributionDate = attr.nextPaymentDate;
  }

  set apr (apr) {
    this._attr.apr = apr || 0;
  }

  get apr () {
    return this._attr.apr || 0;
  }

  get dailyInterest () {
    return this.principal * this.apr / 365;
  };

  get balance () {
    return this._attr.interest + this._attr.principal;
  }

  set interest (amount) {
    this._attr.interest = amount || 0;
  }

  get interest () {
    return this._attr.interest;
  }

  set principal (amount) {
    this._attr.principal = amount || 0;
  }

  get principal () {
    return this._attr.principal;
  }

  adjustBalance (amount) {
    const interest = Math.min(-this._attr.interest, amount);
    this._attr.interest += interest;

    const principal = Math.min(-this._attr.principal, amount - interest);
    this._attr.principal += principal;

    return { interest, principal };
  }

  adjustPrincipal (amount) {
    this._attr.principal += amount;
  }

  adjustInterest (amount) {
    this._attr.interest += amount;
  }

  get maximumContribution () {
    return -this.balance;
  }

  get minimumContribution () {
    return Math.min(-this.balance, this._attr.minimumPayment);
  }

  set minimumPayment (amount) {
    this._attr.minimumPayment = amount || 0;
  }

  set lastPaymentDate (date) {
    this._attr.lastPaymentDate = Day.from(date);
  }

  get lastPaymentDate () {
    return this._attr.lastPaymentDate;
  }

  set nextPaymentDate (date) {
    this._attr.nextPaymentDate = Day.from(date);
  }

  get nextPaymentDate () {
    return this._attr.nextPaymentDate;
  }

  set nextContributionDate (date) {
    this._attr.nextPaymentDate = Day.from(date);
  }

  get nextContributionDate () {
    return this._attr.nextPaymentDate;
  }
}
