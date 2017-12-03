import { ChangeTypes } from 'finance/lib/Projection/Constants';
import Change from './Projection/Change';

export default class Interest extends Change {
  constructor (attr) {
    super(attr);

    this._attr.interest = attr.interest || 0;
  }

  get interest () {
    return this._attr.interest;
  }

  set interest (interest) {
    this._attr.interest = interest;
  }
}
