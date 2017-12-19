import Day from 'units/Day';
import DayRange from 'units/DayRange';

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
    // this._options.endDate = options.

    this._history = new History();
  }

  // significant dates in cycle

  async run () {
    const { accounts, budget } = this._options;

    let cycle = this._options.cycle;
    const endDate = new Day(this._options.endDate);

    const applyInterestForDates = (account, startDate, endDate) => {
      let date = startDate;
      while (date.isOnOrBefore(endDate)) {
        const records = this._history.getRecordsOnDate(date);
        const interest = account.dailyInterest;
        if (interest) {
          account.adjustBalance(interest);
        }
        account.updateDate = date;
        records.setAccountRecord(account);
        date = date.offsetDay(1);
      }
    };

    const historyStartDate = Day.earliest(...accounts.map(account => account.updateDate));
    const historyEndDate = cycle.startDate.offsetDay(-1);

    const historyDates = new DayRange(historyStartDate, historyEndDate).dates;
    for (let i = 0; i < historyDates.length; i++) {
      this._history.initRecordsForDate(historyDates[i]);
    }

    while (cycle.endDate.isOnOrBefore(endDate)) {
      const dates = cycle.dates;

      for (let i = 0; i < dates.length; i++) {
        this._history.initRecordsForDate(dates[i]);
      }

      for (let i = 0; i < accounts.length; i++) {
        const records = this._history.getRecordsOnDate(accounts[i].updateDate);
        records.setAccountRecord(accounts[i]);
        accounts[i].updateDate = accounts[i].updateDate.offsetDay(1);
      }

      // apply interest before payment
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].nextContributionDate) {
          const startDate = accounts[i].updateDate;
          applyInterestForDates(accounts[i], startDate, accounts[i].nextContributionDate);
        }
      }

      // apply minimum payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        let amount = budget.take(account.minimumContribution);
        account.adjustBalance(amount);
      }

      // apply bonus payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        let amount = budget.take(account.maximumContribution);
        account.adjustBalance(amount);
      }

      // set records from payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].nextContributionDate) {
          const records = this._history.getRecordsOnDate(accounts[i].updateDate);
          records.setAccountRecord(accounts[i]);
        }
      }

      // apply remaining cycle interest
      for (let i = 0; i < accounts.length; i++) {
        const startDate = accounts[i].nextContributionDate ? accounts[i].nextContributionDate.offsetDay(1) : dates[0];
        applyInterestForDates(accounts[i], startDate, dates[dates.length - 1]);

        if (accounts[i].nextContributionDate) {
          accounts[i].nextContributionDate = accounts[i].nextContributionDate.offsetMonth(1);
        }
      }

      cycle = cycle.nextCycle;
      budget.reload();
    }

    return Promise.resolve(this._history);
  }
}
