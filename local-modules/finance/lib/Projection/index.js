import Day from 'units/Day';
import DayRange from 'units/DayRange';
import BoundedLoop from 'utils/lib/BoundedLoop';

import { CONTRIBUTION, INTEREST } from './Event';

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
    this.events = [];
  }

  updateAccountState (account) {
    this.accountState = new AccountState(account);
  }

  addEvent (event) {
    this.events.push(event);
  }
}

class HistoryRecords {
  constructor (date) {
    this.date = date;
    this._accountMap = {};
  }

  setAccountRecord (account) {
    if (this._accountMap[account.key]) {
      this._accountMap[account.key].updateAccountState(account.clone());
    } else {
      this._accountMap[account.key] = new AccountHistoryRecord(account.clone());
    }
  }

  addEvent (event) {
    this._accountMap[event.accountKey].addEvent(event);
  }

  get events () {
    return Object.keys(this._accountMap).reduce((events, accountKey) => {
      const accountRecord = this._accountMap[accountKey];
      if (accountRecord) {
        return events.concat(accountRecord.events);
      }
      return events;
    }, []);
  }

  get state () {
    return Object.keys(this._accountMap).reduce((state, accountKey) => {
      const accountRecord = this._accountMap[accountKey];
      if (accountRecord) {
        state[accountKey] = accountRecord.accountState;
      }
      return state;
    }, {});
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
    return this._data.recordsByDate[date.toString()] = new HistoryRecords(date);
  }

  getRecordsOnDate (date) {
    return this._data.recordsByDate[date.toString()];
  }

  getStateOnDate (date) {
    const records = this._data.recordsByDate[date.toString()];
    return records ? records.state : {};
  }

  getEventsOnDate (date) {
    const records = this._data.recordsByDate[date.toString()];
    return records ? records.events : [];
  }

  // setAccountRecord (date, account) {
  //   let records = this._data.recordsByDate[date.toString()];
  //   if (!records) {
  //     records = this._data.recordsByDate[date.toString()] = new HistoryRecords();
  //   }
  //   records.setAccountRecord(account);
  // }

  // getAccountRecord (date, accountKey) {
  //   const records = this._data.recordsByDate[date.toString()];
  //   if (records) {
  //     return records.forAccount(accountKey);
  //   }
  // }
}

export default class Projection {
  constructor (options = {}) {
    this._options = { ...options };

    this._history = new History();
  }

  // significant dates in cycle

  async run () {
    let resolve;
    let boundedLoop;

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
        if (!records) {
          debugger
        }
        records.setAccountRecord(account);
        if (interest) {
          records.addEvent({ accountKey: account.key, amount: interest, type: INTEREST });
        }
        date = date.offsetDay(1);
      }
    };

    const historyStartDate = Day.earliest(...accounts.map(account => account.updateDate));
    const historyEndDate = cycle.startDate.offsetDay(-1);

    const historyDates = new DayRange(historyStartDate, historyEndDate).dates;
    for (let i = 0; i < historyDates.length; i++) {
      this._history.initRecordsForDate(historyDates[i]);
    }

    const loopFn = () => {
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
          const endDate = Day.earliest(accounts[i].nextContributionDate, dates[dates.length - 1]);
          applyInterestForDates(accounts[i], startDate, endDate);
        }
      }

      const contributionEvents = {};

      // apply minimum payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        let amount = budget.take(account.minimumContribution);
        const { principal, interest } = account.adjustBalance(amount);

        if (amount) {
          contributionEvents[account.key] = {
            accountKey: accounts[i].key,
            interest,
            principal,
            type: CONTRIBUTION
          };
        }
      }

      // apply bonus payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        let amount = budget.take(account.maximumContribution);
        const { principal, interest } = account.adjustBalance(amount);
        if (amount && contributionEvents[account.key]) {
          contributionEvents[account.key].principal += principal;
          contributionEvents[account.key].interest += interest;
        }
      }

      // set records from payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].nextContributionDate) {
          const records = this._history.getRecordsOnDate(accounts[i].updateDate);
          records.setAccountRecord(accounts[i]);
          if (contributionEvents[accounts[i].key]) {
            records.addEvent(contributionEvents[accounts[i].key]);
          }
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

      if (cycle.endDate.isOnOrBefore(endDate)) {
        budget.reload();
      } else {
        boundedLoop.stop();
        resolve();
      }
    }

    boundedLoop = new BoundedLoop({ loopFn });

    return new Promise((_resolve) => {
      resolve = _resolve;
      boundedLoop.start();
    });
  }
}
