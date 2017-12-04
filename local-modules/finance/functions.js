function projectPayments(accountTable, budget, startDate) {
  var accounts = Account.fromTable5(accountTable);
  var payments = _projectAccounts(accounts, budget, startDate);
  
  return payments.map(function(payment) {
    return [
      payment.key,
      payment.date,
      payment.balance,
      "Payment",
      -payment.total,
      -payment.principal,
      -payment.interest
    ];
  });
};

function expandMonths(months) {
  periods = parseInt(months);
  return Text.monthsToYearsAndMonths(months);
};

function oneMonthInterest(balance, apr) {
  return Util.oneMonthInterest(balance, apr);
};

// TODO: Consolidate this logic with something from 'projection.gs' (or into a 'budget.gs' ?)
function distributePaymentBudget(balances, minimums, budget) {
  budget = parseFloat(budget);
  
  var payments = minimums.map(function(minimum, index) {
    var payment = Math.max(0, Math.min(balances[index], minimum, budget));
    balances[index] -= payment;
    budget -= payment;
    return payment;
  });
  
  for (var i = 0; i < payments.length; i++) {
    var payment = Math.max(0, Math.min(balances[i], budget));
    balances[i] -= payment;
    budget -= payment;
    payments[i] += payment;
  };
  
  return payments;
};

function remapBalanceHistory(dates, balances, targetDates) {
  targetDates = Util.flatten(targetDates).map(function(d) { return new Day(d) });
  var history = History.fromDatesAndPrincipals(Util.flatten(dates), Util.flatten(balances));
  return history.getPrincipalsForDates(targetDates);
};

function createAccounts(keys, principals, aprs, minimums, interest) {
  return keys.map(function(key, index) {
    return [
      key[0],
      floatToDollars(principals[index][0]),
      aprs[index][0],
      floatToDollars(minimums[index][0]),
      floatToDollars(interest[index][0])
    ]
  });
};

function historyTotalInterest(accountKeys, historyTable) {
  var results = accountKeys.reduce(function(result, key) { result[key] = 0; return result; }, {});
  historyTable.forEach(function(payment) {
    results[payment[0]] += payment[6];
  });
  return accountKeys.map(function(key) { return results[key] });
};

function historyTotalPeriods(accountKeys, historyTable) {
  var startDate = historyTable[0][1];
  var results = accountKeys.reduce(function(result, key) { result[key] = startDate; return result; }, {});
  historyTable.forEach(function(payment) {
    results[payment[0]] = payment[1];
  });
  return accountKeys.map(function(key) {
    return Dates.monthsBetween(startDate, results[key]);
  });
};

// An algorithm could describe the optimal priority for decreasing total minimums before a given date.
function historyMinimums(accountKeys, accountMinimums, historyTable) {
  var loanKeys = Util.flatten(accountKeys);
  var minimums = Util.flatten(accountMinimums);
  var results = historyTable.reduce(function(result, payment) {
    var minimum = minimums[loanKeys.indexOf(payment[0])];
    var currentTotal = result[payment[1]] || 0;
    result[payment[1]] = currentTotal + Math.min(minimum, payment[2]);
    return result;
  }, {});
  return Object.keys(results).map(function(date) {
    return [new Date(date), results[date]];
  });
};
