import Day from 'units/Day';

import AccountState from './AccountState';

export default class AccountHistory {
  constructor (account, adjustments) {
    this.account = account;
    this.adjustments = adjustments;

    // temp to get calculation cooperating
    const adjustment = this.adjustments[0];
    this._TEMP_ACCOUNT_STATE = new AccountState({
      date: new Day(adjustment.date),
      interest: adjustment.interest,
      principal: adjustment.principal
    });
  }

  getAccountStateAtDate (date) {
    return this._TEMP_ACCOUNT_STATE;
  }
}
