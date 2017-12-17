import Day from 'units/Day';

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
}

class HistoryRecords {
  constructor () {
    this._accountMap = {};
  }

  setAccountRecord (account) {
    this._accountMap[account.key] = new AccountHistoryRecord(account.clone());
  }

  forAccount (accountKey) {
    return this._accountMap[accountKey];
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

    for (let i = 0; i < dates.length; i++) {
      this._history.initRecordsForDate(dates[i]);
    }

    const applyInterestForDates = (account, startDate, endDate) => {
      let date = startDate;
      while (date.isOnOrBefore(endDate)) {
        const records = this._history.getRecordsOnDate(date);
        const interest = account.dailyInterest;
        if (interest) {
          account.adjustBalance(interest);
        }
        records.setAccountRecord(account);
        date = date.offsetDay(1);
      }
    };

    // apply interest before payment
    for (let a = 0; a < accounts.length; a++) {
      if (accounts[a].nextContributionDate) {
        applyInterestForDates(accounts[a], dates[0], accounts[a].nextContributionDate);
      }
    }

    // apply minimum payments
    for (let a = 0; a < accounts.length; a++) {
      const account = accounts[a];
      let amount = budget.take(account.minimumContribution);
      account.adjustBalance(amount);
    }

    // apply bonus payments
    for (let a = 0; a < accounts.length; a++) {
      const account = accounts[a];
      let amount = budget.take(account.maximumContribution);
      account.adjustBalance(amount);
    }

    // set records from payments
    for (let a = 0; a < accounts.length; a++) {
      if (accounts[a].nextContributionDate) {
        const records = this._history.getRecordsOnDate(accounts[a].nextContributionDate);
        records.setAccountRecord(accounts[a]);
      }
    }

    // apply remaining cycle interest
    for (let a = 0; a < accounts.length; a++) {
      const startDate = accounts[a].nextContributionDate ? accounts[a].nextContributionDate.offsetDay(1) : dates[0];
      applyInterestForDates(accounts[a], startDate, dates[dates.length - 1]);
    }

    return new Promise((resolve) => {
      resolve(this._history);
    });
  }
}
