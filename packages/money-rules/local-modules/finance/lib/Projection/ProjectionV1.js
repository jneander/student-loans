import Day from 'units/Day';
import { daysBetween, nextMonth, range, today } from 'units/Dates';
import { floatToDollars } from 'units/Dollars';
import BoundedLoop from 'utils/lib/BoundedLoop';

import Account from 'finance/lib/Account';
import Interest from 'finance/lib/Interest';
import Payment from 'finance/lib/Payment';
import { ChangeTypes } from 'finance/lib/Projection/Constants';

import ProjectionState from './ProjectionState';

function haveRemainingPrincipal (accounts) {
  return accounts.some(function(account) {
    return account.getPrincipal() > 0;
  });
}

function getRemainingBudget (budget, payments) {
  return budget - payments.reduce(function(sum, payment) {
    return sum + payment.total;
  }, 0);
}

function reduceAccountBalance (account, principal, interest) {
  account.adjustPrincipal(-principal);
  account.adjustInterest(-interest);
}

function calculateInterest (account, days) {
  return account.getPrincipal() * (account.apr * days / 365);
}

function applyInterest (accounts, days) {
  accounts.forEach((account) => {
    const interest = calculateInterest(account, days);
    account.adjustInterest(floatToDollars(interest));
  });
}

function createBlankPayments (accounts) {
  return accounts.map(account => new Payment({ accountKey: account.key }))
}

function _updatePaymentAmounts(payment, payable, interest) {
  payment.total += payable;
  payment.principal += (payable - interest);
  payment.interest += interest;
}

function applyMinimumPayments (accounts, payments, budget) {
  for (var i in accounts) {
    const payable = Math.min(budget, accounts[i].getMinimumPayment());
    const interest = Math.min(payable, accounts[i].getInterest());
    reduceAccountBalance(accounts[i], payable - interest, interest);
    _updatePaymentAmounts(payments[i], payable, interest);
    budget -= payable;
  }
}

function applyBonusPayments (accounts, payments, budget) {
  for (var i in accounts) {
    const payable = Math.min(budget, accounts[i].getPrincipal() + accounts[i].getInterest());
    const interest = Math.min(payable, accounts[i].getInterest());
    reduceAccountBalance(accounts[i], payable - interest, interest);
    _updatePaymentAmounts(payments[i], payable, interest);
    budget -= payable;
  }
}

function _finalizePayments(payments, currentDate) {
  payments.forEach(function(payment) {
    payment.date = currentDate;
  });
}

function _updatePeriod(period) {
  period.start = new Date(period.end);
  period.end = nextMonth(period.end);
}

function applyInterestOnDate (account, date, projectionsByDate) {
  if (account.willAccrueInterest) {
    const interest = calculateInterest(account, 1);
    account.adjustInterest(interest);
    const projection = projectionsByDate[date.toString()] || { date, accountStates: {}, changes: [] };
    projection.accountStates[account.key] = getAccountState(account);
    projection.changes.push(new Interest({ accountKey: account.key, interest }));
  }
}

function makeAccountsCurrent (accounts, projectionsByDate) {
  const today = Day.today();
  accounts.forEach((account) => {
    let loopDate = account.getLastPaymentDate();
    while (account.willAccrueInterest && loopDate.isBefore(today)) {
      applyInterestOnDate(account, loopDate, projectionsByDate);
      loopDate = loopDate.offsetDay(1);
    }
  });
}

function getAccountState (account) {
  return {
    balance: account.getPrincipal(),
    currentPrincipal: account.getPrincipal()
  };
}

export default class Projection {
  constructor (options) {
    this.options = options;

    this.projectionsByDate = {};
  }

  getStateAtDate (date) {
    const projectionDatum = this.projectionsByDate[date.toString()] || {};
    return new ProjectionState(date, projectionDatum);
  }

  run () {
    if (!this._timeline) {
      const accounts = this.options.accounts.map(account => account.clone());

      this.startDate = this.options.startDate;

      // const loopDate = accounts.reduce((date, account) => {
      //   const accountDate = account.getLastPaymentDate();
      //   return date.isOnOrBefore(accountDate) ? date : accountDate;
      // }, accounts[0].getLastPaymentDate());
      // const limitDate = loopDate.offsetYear(20);

      let limit = 240;
      const period = { start: this.startDate.date(), end: this.startDate.date() };

      let boundedLoop;

      // make accounts current
      makeAccountsCurrent(accounts, this.projectionsByDate);

      // const dayLoop = () => {
      //   if (!haveRemainingPrincipal(accounts) || loopDate.isAfter(limitDate)) {
      //     boundedLoop.stop();
      //     this.options.onFinish();
      //   }

      //   loopDate = loopDate.offsetDay(1);
      // }

      const loopFn = () => {
        if (!haveRemainingPrincipal(accounts) || limit-- <= 0) {
          boundedLoop.stop();
          this.options.onFinish();
          return;
        }

        const payments = createBlankPayments(accounts);
        applyMinimumPayments(accounts, payments, this.options.budget);

        const remainingBudget = getRemainingBudget(this.options.budget, payments);
        applyBonusPayments(accounts, payments, remainingBudget);

        const accountStates = {};

        // get state of accounts at start of period
        for (let i = 0; i < accounts.length; i++) {
          accountStates[accounts[i].key] = getAccountState(accounts[i]);
        }

        applyInterest(accounts, daysBetween(period.start, period.end));

        const paymentDate = period.end;
        const changes = payments.filter(payment => payment.total > 0);
        const date = new Day(paymentDate);

        this.projectionsByDate[date.toString()] = { date, accountStates, changes };
        this.endDate = date;

        _updatePeriod(period);
      };

      boundedLoop = new BoundedLoop({ loopFn });
      boundedLoop.start();
    }
  }
}

// different periods per account
// start date of first period is last payment date
