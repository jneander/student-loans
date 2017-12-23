import Day from 'units/Day';
import DayRange from 'units/DayRange';
import BoundedLoop from 'utils/lib/BoundedLoop';

import History from '../History';
import Strategy from '../Strategy';

import { CONTRIBUTION, INTEREST } from './Event';

export default class Projection {
  constructor (options = {}) {
    this._options = { ...options };

    this._options.strategy = this._options.strategy || new Strategy();

    this._history = new History();
    this._state = 'idle';
  }

  get aborted () {
    return this._state === 'aborted';
  }

  get finished () {
    return this._state === 'finished';
  }

  get started () {
    return this._state === 'started';
  }

  abort () {
    if (!this.finished) {
      this._state = 'aborted';
    }
  }

  async run () {
    let resolve;
    let boundedLoop;

    let { accounts } = this._options;
    const { budget, strategy } = this._options;

    let cycle = this._options.cycle;
    const endDate = new Day(this._options.endDate);

    const applyInterestForDates = (account, startDate, endDate) => {
      let date = startDate;
      while (date.isOnOrBefore(endDate)) {
        const interest = account.dailyInterest;
        if (interest) {
          account.adjustBalance(interest);
        }
        account.updateDate = date;
        this._history.updateState(account, date);
        if (interest) {
          const event = {
            accountKey: account.key,
            amount: interest,
            date,
            type: INTEREST
          };
          this._history.addEvent(event, date);
        }
        date = date.offsetDay(1);
      }
    };

    const historyStartDate = Day.earliest(...accounts.map(account => account.updateDate));
    const historyEndDate = cycle.startDate.offsetDay(-1);

    const loopFn = () => {
      if (this.aborted) {
        boundedLoop.stop();
        return;
      }

      accounts = strategy.prioritizeAccounts(accounts);
      const dates = cycle.dates;

      for (let i = 0; i < accounts.length; i++) {
        this._history.updateState(accounts[i], accounts[i].updateDate);
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

        if (cycle.endDate.isOnOrAfter(account.nextContributionDate)) {
          let amount = budget.take(account.minimumContribution);
          const { principal, interest } = account.adjustBalance(amount);

          if (amount) {
            contributionEvents[account.key] = {
              accountKey: accounts[i].key,
              date: account.nextContributionDate,
              interest,
              principal,
              type: CONTRIBUTION
            };
          }
        }
      }

      // apply bonus payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];

        if (cycle.endDate.isOnOrAfter(account.nextContributionDate)) {
          let amount = budget.take(account.maximumContribution);
          const { principal, interest } = account.adjustBalance(amount);
          if (amount && contributionEvents[account.key]) {
            contributionEvents[account.key].principal += principal;
            contributionEvents[account.key].interest += interest;
          }
        }
      }

      // set records from payments
      // this will take place on the account's current update date
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        if (cycle.endDate.isOnOrAfter(account.nextContributionDate)) {
          this._history.updateState(account, account.updateDate);
          if (contributionEvents[account.key]) {
            this._history.addEvent(contributionEvents[account.key], account.updateDate);
          }
        }
      }

      // apply remaining cycle interest
      for (let i = 0; i < accounts.length; i++) {
        const startDate = accounts[i].nextContributionDate ? accounts[i].nextContributionDate.offsetDay(1) : dates[0];
        applyInterestForDates(accounts[i], startDate, dates[dates.length - 1]);

        if (cycle.endDate.isOnOrAfter(accounts[i].nextContributionDate)) {
          accounts[i].nextContributionDate = accounts[i].nextContributionDate.offsetMonth(1);
        }
      }

      cycle = cycle.nextCycle;

      if (cycle.endDate.isOnOrBefore(endDate)) {
        budget.reload();
      } else {
        boundedLoop.stop();
        this._state = 'finished';
        resolve();
      }
    }

    boundedLoop = new BoundedLoop({ loopFn });

    return new Promise((_resolve) => {
      resolve = _resolve;
      this._state = 'started';
      boundedLoop.start();
    });
  }
}
