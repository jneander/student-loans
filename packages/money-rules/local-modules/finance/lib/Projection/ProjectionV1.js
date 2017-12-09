import { daysBetween, nextMonth, today } from 'units/Dates';

import Account from 'finance/lib/Account';

function _haveRemainingPrincipal(accounts) {
  return accounts.some(function(account) {
    return account.getCurrentPrincipal() > 0;
  });
};

function _getRemainingBudget(budget, payments) {
  return budget - payments.reduce(function(sum, payment) {
    return sum + payment.total;
  }, 0);
};

function _reduceAccountBalance(account, principal, interest) {
  account.reducePrincipal(principal);
  account.reduceInterest(interest);
};

function _applyInterest(accounts, days) {
  accounts.forEach(function(account) {
    account.applyInterest(days);
  });
};

function _createBlankPayments(accounts) {
  return accounts.map(function(account) {
    return {key: account.key, principal: 0, interest: 0, total: 0};
  });
};

function _updatePaymentAmounts(payment, payable, interest) {
  payment.total += payable;
  payment.principal += (payable - interest);
  payment.interest += interest;
};

function _applyMinimumPayments(accounts, payments, budget) {
  for (var i in accounts) {
    var payable = Math.min(budget, accounts[i].getMinimumPayment());
    var interest = Math.min(payable, accounts[i].getCurrentInterest());
    _reduceAccountBalance(accounts[i], payable - interest, interest);
    _updatePaymentAmounts(payments[i], payable, interest);
    budget -= payable;
  }
};

function _applyBonusPayments(accounts, payments, budget) {
  for (var i in accounts) {
    var payable = Math.min(budget, accounts[i].getMaximumPayment());
    var interest = Math.min(payable, accounts[i].getCurrentInterest());
    _reduceAccountBalance(accounts[i], payable - interest, interest);
    _updatePaymentAmounts(payments[i], payable, interest);
    payments[i].balance = accounts[i].getCurrentPrincipal();
    budget -= payable;
  }
};

function _finalizePayments(payments, currentDate) {
  payments.forEach(function(payment) {
    payment.date = currentDate;
  });
};

function _addNonzeroPayments(allPayments, newPayments) {
  var nonzero = newPayments.filter(function(payment) {
    return payment.total > 0;
  });
  Array.prototype.push.apply(allPayments, nonzero);
};

function _updatePeriod(period) {
  period.start = new Date(period.end);
  period.end = nextMonth(period.end);
};

function _projectAccounts(accounts, budget, startDate) {
  var limit = 240;
  var payments = [];
  var period = { start: startDate || today(), end: startDate || today() };

  while (_haveRemainingPrincipal(accounts) && limit-- > 0) {
    var _payments = _createBlankPayments(accounts);
    _applyMinimumPayments(accounts, _payments, budget);
    var remainingBudget = _getRemainingBudget(budget, _payments);
    _applyBonusPayments(accounts, _payments, remainingBudget);
    _applyInterest(accounts, daysBetween(period.start, period.end));
    _finalizePayments(_payments, period.end);
    _addNonzeroPayments(payments, _payments);
    _updatePeriod(period);
  }

  return payments;
};

function createDateKey (date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}/${month}/${day}`;
}

export default class Projection {
  constructor (options) {
    this.options = options;
  }

  run () {
    if (!this.payments) {
      const accounts = this.options.accounts.map(account => account.clone());
      const payments = _projectAccounts(accounts, this.options.budget, this.options.startDate);
      this.payments = payments;

      const paymentsByDate = payments.reduce((map, payment) => {
        const dateKey = createDateKey(payment.date);
        map[dateKey] = map[dateKey] || [];
        map[dateKey].push(payment);
        return map;
      }, {});

      const accountKeys = this.options.accounts.map(account => account.key);
      const dateKeys = Object.keys(paymentsByDate).sort();

      const orderedPaymentDateMaps = dateKeys.map((dateKey) => {
        const payments = paymentsByDate[dateKey];
        const dateMap = {
          date: payments[0].date
        };

        payments.forEach((payment) => {
          dateMap[payment.key] = payment;
        });

        return dateMap;
      });

      this._timeline = orderedPaymentDateMaps;
    }
  }

  timeline () {
    if (!this._timeline) {
      return [];
    }
    return this._timeline;
  }
}
