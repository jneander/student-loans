import { ChangeTypes } from 'finance/lib/Projection/Constants';

export default class Payment {
  constructor (attr) {
    this._attr = {
      accountKey: attr.accountKey,
      interest: attr.interest || 0,
      principal: attr.principal || 0,
      total: attr.total || 0,
      type: ChangeTypes.PAYMENT
    };
  }

  get accountKey () {
    return this._attr.accountKey;
  }

  get interest () {
    return this._attr.interest;
  }

  set interest (interest) {
    this._attr.interest = interest;
  }

  get principal () {
    return this._attr.principal;
  }

  set principal (principal) {
    this._attr.principal = principal;
  }

  get total () {
    return this._attr.total;
  }

  set total (total) {
    this._attr.total = total;
  }

  get type () {
    return this._attr.type;
  }
}
