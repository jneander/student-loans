import LoanAccount from 'finance/lib/accounts/LoanAccount';
import Cycle from 'finance/lib/Cycle';
import Budget from 'finance/lib/Budget';
import Plan from 'finance/lib/Plan';
import Strategy from 'finance/lib/Strategy';
import Projection from 'finance/lib/Projection';
import Day from 'units/Day';

import { accountData } from 'js/apps/home/data';
const ACCOUNT_KEYS = accountData.map(account => account.key);

function prettyNumber (value, decimalPlaces = 2) {
  return value.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function dollar (amount) {
  return `$${prettyNumber(amount)}`;
}

describe('Projection', () => {
  let plan;
  let projection;

  async function runProjection () {
    projection = new Projection(plan);
    await projection.run();
  }

  function getSummaryOnDate (date) {
    return projection._history.forDate(date).summary;
  }

  function getSummaryForAccount (accountKey) {
    return projection._history.forAccount(accountKey);
  }

  function printSummary (summary) {
    console.log(`${summary.key.padEnd(6, ' ')}${summary.totalContribution.padStart(12, ' ')}`);
  }

  beforeEach(() => {
    let accounts = accountData.map(datum => new LoanAccount(datum));
    accounts = new Strategy({ debtPriority: 'avalanche' }).prioritizeAccounts(accounts);
    plan = new Plan({
      accounts,
      budget: new Budget({ balance: 91.91, refreshAmount: 1300 }),
      cycle: new Cycle({ startDate: new Day('2017/12/01'), startDay: 1 }),
      endDate: '2040/11/30'
    });
  });

  describe('account state', () => {
    it('works with real data', async () => {
      const summaries = [];
      const overall = {
        key: 'Total',
        totalContribution: 0
      };

      await runProjection();

      ACCOUNT_KEYS.forEach((accountKey) => {
        const thisContribution = getSummaryForAccount(accountKey).totalContribution;
        overall.totalContribution += thisContribution;

        summaries.push({
          key: accountKey,
          totalContribution: dollar(thisContribution)
        });
      });

      summaries.forEach(printSummary);
      overall.totalContribution = dollar(overall.totalContribution);
      printSummary(overall);
    });
  });
});
