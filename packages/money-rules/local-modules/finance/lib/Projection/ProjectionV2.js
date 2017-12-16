import Cycle from 'finance/lib/Cycle';
import Interest from 'finance/lib/Interest';
import Payment from 'finance/lib/Payment';
import Day from 'units/Day';
import Month from 'units/Month';

function getAccountState (account) {
  return {
    balance: account.getPrincipal(),
    currentPrincipal: account.getPrincipal()
  };
}

function calculateInterest (account, days) {
  return account.getPrincipal() * (account.apr * days / 365);
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
    let loopDate = account.lastPaymentDate;
    while (account.willAccrueInterest && loopDate.isBefore(today)) {
      applyInterestOnDate(account, loopDate, projectionsByDate);
      loopDate = loopDate.offset({ days: 1 });
    }
  });
}

function applyInterestInDateRange (account, startDate, endDate) {
  let currentDate = startDate;
  while (currentDate.isOnOrBefore(endDate)) {
    currentDate = currentDate.offset({ days: 1 });
  }
}

function createCycle (cycleStartDate) {
  let mostRecentCycleStartDate = Day.today();
  while (mostRecentCycleStartDate.day > cycleStartDate) {
    mostRecentCycleStartDate = mostRecentCycleStartDate.offsetDay(-1);
  }

  return new Cycle({ startDate: mostRecentCycleStartDate });
}

function maybeUpdateBudget (budget, currentDate) {
}

export default class Projection {
  constructor (options = {}) {
    this.options = { ...options };
    this.options.cycleStartDate = this.options.cycleStartDate || 1;

    this.projectionsByDate = {};
  }

  get startDate () {

  }

  get endDate () {

  }

  run () {
    if (this._timeline) {
      return;
    }

    // apply interest up to current date
    // establish current cycle
    let cycle = createCycle(this.options.cycleStartDate);

    // remove any recorded payments from current cycle
    // finish current cycle
    // perform each remaining cycle

    const accounts = this.options.accounts;
    // const budget = 

    const loopCycle = (cycle) => {
      // add interest to each account up to its next payment date
      accounts.forEach((account) => {
        const nextDueDate = account.nextPaymentDate;
        if (nextDueDate) {
          applyInterestInDateRange(account, cycle.startDate, Day.earliest(nextDueDate, cycle.endDate));
        }
      });

      // add required payments to each account (minimums)
      for (let i = 0; i < accounts.length; i++) {
        const amount = budget.take(accounts[i].minimumContribution);
        accounts[i].adjustBalance(amount);
      }

      // add optional payments to each account (bonus)
      for (let i = 0; i < accounts.length; i++) {
        const amount = budget.take(accounts[i].balance);
        accounts[i].adjustBalance(amount);
      }

      // add interest to each account from payment date to end of period
      for (let i = 0; i < accounts.length; i++) {
        const nextDueDate = accounts[i].nextPaymentDate;
        const nextInterestDate = nextDueDate ? nextDueDate.offsetDay(1) : null;
        if (nextInterestDate) {
          applyInterestInDateRange(accounts[i], nextInterestDate, Day.earliest(nextInterestDate, cycle.endDate));
        }
      }
    };

    // const loopDate = accounts.reduce((date, account) => {
    //   const accountDate = account.lastPaymentDate;
    //   return date.isOnOrBefore(accountDate) ? date : accountDate;
    // }, accounts[0].lastPaymentDate);
    // let limitDate = loopDate.offsetYear(20);

    const projectionLoop = () => {
      // get the dates of the current period


      // run the period loop
      // refresh the budget
      // if the end date is not reached, REPEAT
    };

    // get the next period start date
    // cycle = cycle.nextCycle;

    // make the accounts current to the next period start date

    const today = Day.today();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].willAccrueInterest) {
        applyInterestInDateRange(accounts[i], accounts[i].updateDate, today);
      }
    }

    // get the end date of the last period in the limited range
    // startDate = endDate.offset({ days: 1 });
    // endDate = endDate.offset({ months: 1 });
    // const projectionEndDate = endDate.offset({ years: 20 });

    // loop through the periods
    // loopCycle(cycle);
    // while (endDate.isOnOrBefore(projectionsByDate)) {
    //   endDate = endDate.offset({ months: 1 });
    // }

    // boundedLoop = new BoundedLoop({ loopFn });
    // boundedLoop.start();
  }
}
