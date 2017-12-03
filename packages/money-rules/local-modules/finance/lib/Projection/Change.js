import { ChangeTypes } from 'finance/lib/Projection/Constants';

export default class Change {
  constructor (attr) {
    this._attr = {
      accountKey: attr.accountKey,
      type: ChangeTypes.INTEREST
    };
  }

  get accountKey () {
    return this._attr.accountKey;
  }

  get type () {
    return this._attr.type;
  }
}
