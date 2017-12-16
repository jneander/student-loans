import Day from 'units/Day';

import Cycle from '../Cycle';

class AccountState {
  constructor (account) {
    this._account = account;
  }

  get interest () {
    return this._account.interest;
  }

  get principal () {
    return this._account.principal;
  }
}

class AccountHistoryRecord {
  constructor (account) {
    this.accountState = new AccountState(account);
  }

  get length () {
    return 0;
  }
}

class HistoryRecords {
  constructor (accounts) {
    this._accounts = accounts.map(account => account.clone());
  }

  forAccount (accountKey) {
    const account = this._accounts.find(account => account.key === accountKey);
    if (account) {
      return new AccountHistoryRecord(account);
    }
  }
}

class History {
  constructor () {
    this._data = {
      recordsByDate: {}
    };
  }

  initRecordsForDate (date, accounts) {
    this._data.recordsByDate[date.toString()] = new HistoryRecords(accounts);
  }

  getRecordsOnDate (date) {
    return this._data.recordsByDate[date.toString()];
  }
}

export default class Projection {
  constructor (options = {}) {
    this._options = { ...options };
    this._state = {};

    this._state.startDate = Day.today();
    this._history = new History();
  }

  // significant dates in cycle

  async run () {
    const budget = this._options.budget;
    const dates = this._options.cycle.dates;

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];

      for (let a = 0; a < this._options.accounts.length; a++) {
        const account = this._options.accounts[a];
        const interest = account.dailyInterest;
        if (interest) {
          account.adjustBalance(interest);
        }
      }

      for (let a = 0; a < this._options.accounts.length; a++) {
        const account = this._options.accounts[a];
        if (date.equals(account.nextContributionDate)) {
          let amount = budget.take(account.minimumContribution);
          account.adjustBalance(amount);
        }
      }

      for (let a = 0; a < this._options.accounts.length; a++) {
        const account = this._options.accounts[a];
        if (date.equals(account.nextContributionDate)) {
          let amount = budget.take(account.maximumContribution);
          account.adjustBalance(amount);
        }
      }

      this._history.initRecordsForDate(date, this._options.accounts);
    }

    return new Promise((resolve) => {
      resolve(this._history);
    });
  }
}
