import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
import Day from 'units/Day';
import DayRange from 'units/DayRange';
import BoundedLoop from 'utils/lib/BoundedLoop';

import DateRecord from './DateRecord';

class AccountSummary {
  constructor (accountKey) {
    this._accountKey = accountKey;
    this._lastContribution = null;
  }

  addEvent (event) {
    if (event.type === CONTRIBUTION) {
      if (this._lastContribution && event.date.isOnOrAfter(this._lastContribution.date)) {
        this._lastContribution = event;
      } else {
        this._lastContribution = event;
      }
    }
  }

  get lastContributionAmount () {
    if (this._lastContribution) {
      const { principal, interest } = this._lastContribution;
      return principal + interest;
    }
  }

  get lastContributionDate () {
    return this._lastContribution && this._lastContribution.date;
  }
}

export default class History {
  constructor () {
    this._data = {};
    this._summaryData = {};
  }

  forDate (date) {
    return this._data[date.toString()] = this._data[date.toString()] || new DateRecord();
  }

  forAccount (accountKey) {
    return this._summaryData[accountKey] = this._summaryData[accountKey] || new AccountSummary(accountKey);
  }

  updateState (account, date) {
    this.forDate(date).setAccountState(account);
  }

  addEvent (event, date) {
    this.forDate(date).addEvent(event);
    this.forAccount(event.accountKey).addEvent(event);
  }

  getAccountSummary (accountKey) {
    return this.forAccount(accountKey);
  }
}
