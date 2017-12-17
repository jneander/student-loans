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
  constructor () {
    this._accountMap = {};
  }

  setAccountRecord (account) {
    this._accountMap[account.key] = account.clone();
  }

  forAccount (accountKey) {
    if (this._accountMap[accountKey]) {
      return new AccountHistoryRecord(this._accountMap[accountKey]);
    }
  }
}

class History {
  constructor () {
    this._data = {
      recordsByDate: {}
    };
  }

  initRecordsForDate (date) {
    return this._data.recordsByDate[date.toString()] = new HistoryRecords();
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
    const { accounts, budget } = this._options;
    const dates = this._options.cycle.dates;

    const applyInterestForDates = (account, startDate, endDate) => {

    };

    const accountContributionDates = accounts.reduce((map, account) => (
      { ...map, [account.key]: account.nextContributionDate }
    ), {});

    // apply interest
    // apply minimum payments
    // apply bonus payments
    // apply remaining cycle interest

    // for (let a = 0; a < this._options.accounts.length; a++) {
    //   const account = this._options.accounts[a];
    //   const interest = account.dailyInterest;
    //   if (interest) {
    //     account.adjustBalance(interest);
    //   }
    // }

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];

      const records = this._history.initRecordsForDate(date);

      for (let a = 0; a < accounts.length; a++) {
        const account = accounts[a];
        const interest = account.dailyInterest;
        if (interest) {
          account.adjustBalance(interest);
        }
      }

      for (let a = 0; a < accounts.length; a++) {
        const account = accounts[a];
        if (date.equals(account.nextContributionDate)) {
          let amount = budget.take(account.minimumContribution);
          account.adjustBalance(amount);
        }
      }

      for (let a = 0; a < accounts.length; a++) {
        const account = accounts[a];
        if (date.equals(account.nextContributionDate)) {
          let amount = budget.take(account.maximumContribution);
          account.adjustBalance(amount);
        }
      }

      for (let a = 0; a < accounts.length; a++) {
        records.setAccountRecord(accounts[a]);
      }
    }

    return new Promise((resolve) => {
      resolve(this._history);
    });
  }
}
