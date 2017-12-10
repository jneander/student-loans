import Day from 'units/Day';
import { daysBetween, nextMonth, range, today } from 'units/Dates';

import Account from 'finance/lib/Account';
import { ChangeTypes } from 'finance/lib/Projection/Constants';

function _haveRemainingPrincipal(accounts) {
  return accounts.some(function(account) {
    return account.getCurrentPrincipal() > 0;
  });
}

function _getRemainingBudget(budget, payments) {
  return budget - payments.reduce(function(sum, payment) {
    return sum + payment.total;
  }, 0);
}

function _reduceAccountBalance(account, principal, interest) {
  account.reducePrincipal(principal);
  account.reduceInterest(interest);
}

function _applyInterest(accounts, days) {
  accounts.forEach(function(account) {
    account.applyInterest(days);
  });
}

function _createBlankPayments(accounts) {
  return accounts.map(function(account) {
    return {
      accountKey: account.key,
      interest: 0,
      key: account.key, // replace with accountKey
      principal: 0,
      total: 0,
      type: ChangeTypes.PAYMENT
    };
  });
}

function _updatePaymentAmounts(payment, payable, interest) {
  payment.total += payable;
  payment.principal += (payable - interest);
  payment.interest += interest;
}

function _applyMinimumPayments(accounts, payments, budget) {
  for (var i in accounts) {
    var payable = Math.min(budget, accounts[i].getMinimumPayment());
    var interest = Math.min(payable, accounts[i].getCurrentInterest());
    _reduceAccountBalance(accounts[i], payable - interest, interest);
    _updatePaymentAmounts(payments[i], payable, interest);
    budget -= payable;
  }
}

function _applyBonusPayments(accounts, payments, budget) {
  for (var i in accounts) {
    var payable = Math.min(budget, accounts[i].getMaximumPayment());
    var interest = Math.min(payable, accounts[i].getCurrentInterest());
    _reduceAccountBalance(accounts[i], payable - interest, interest);
    _updatePaymentAmounts(payments[i], payable, interest);
    payments[i].balance = accounts[i].getCurrentPrincipal();
    budget -= payable;
  }
}

function _finalizePayments(payments, currentDate) {
  payments.forEach(function(payment) {
    payment.date = currentDate;
  });
}

function _addNonzeroPayments(allPayments, newPayments) {
  var nonzero = newPayments.filter(function(payment) {
    return payment.total > 0;
  });
  Array.prototype.push.apply(allPayments, nonzero);
}

function _updatePeriod(period) {
  period.start = new Date(period.end);
  period.end = nextMonth(period.end);
}

export default class Projection {
  constructor (options) {
    this.options = options;

    this.projectionsByDate = {};
  }

  run () {
    if (!this._timeline) {
      const accounts = this.options.accounts.map(account => account.clone());

      this.startDate = this.options.startDate;

      let limit = 240;
      const period = { start: this.startDate.date(), end: this.startDate.date() };

      while (_haveRemainingPrincipal(accounts) && limit-- > 0) {
        const accountStates = {};
        const changes = [];

        const payments = _createBlankPayments(accounts);
        _applyMinimumPayments(accounts, payments, this.options.budget);
        const remainingBudget = _getRemainingBudget(this.options.budget, payments);
        _applyBonusPayments(accounts, payments, remainingBudget);

        // get state of accounts at start of period
        for (let i = 0; i < accounts.length; i++) {
          accountStates[accounts[i].key] = {
            balance: accounts[i].getCurrentPrincipal()
          }
        }

        const paymentDate = period.end;

        _applyInterest(accounts, daysBetween(period.start, period.end));
        _finalizePayments(payments, paymentDate); // TODO: should this be the period start?
        _addNonzeroPayments(changes, payments);

        const date = new Day(paymentDate);

        this.projectionsByDate[date.toString()] = { date, accountStates, changes };
        this.endDate = date;

        _updatePeriod(period);
      }
    }
  }
}
