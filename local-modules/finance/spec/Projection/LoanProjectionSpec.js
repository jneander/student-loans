import sinon from 'sinon';

import LoanAccount from 'finance/lib/accounts/LoanAccount';
import Cycle from 'finance/lib/Cycle';
import Budget from 'finance/lib/Budget';
import Projection from 'finance/lib/Projection';
import Day from 'units/Day';

describe('Projection', () => {
  let clock;
  let projection;
  let projectionOptions;

  async function runProjection () {
    projection = new Projection(projectionOptions);
    return projection.run();
  }

  function getAccountRecord (history, accountKey, date) {
    const records = history.getRecordsOnDate(date);
    return records.forAccount(accountKey);
  }

  beforeEach(() => {
    projectionOptions = {
      accounts: [],
      budget: new Budget({ balance: 100, refreshAmount: 100 }),
      cycle: new Cycle({ startDate: new Day('2000/01/01'), startDay: 1 }),
      endDate: '2000/01/31'
    };
    clock = sinon.useFakeTimers(new Date('2000/01/01'));
  });

  afterEach(() => {
    clock.restore();
  });

  context('with no accounts', () => {
    it('has no records', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/01/01'));
      expect(records.forAccount('example')).to.be.undefined;
    });
  });

  context('with a zero-balance loan account', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example',
          nextPaymentDate: null,
          minimumPayment: 0,
          monthlyPaymentDay: 1,
          principal: 0,
          updateDate: '2000/01/01'
        })
      ];
    });

    it('has records on the first date of the projection range', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/01/01'));
      expect(records).to.exist;
    });

    it('has records on the last date of the projection range', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/01/31'));
      expect(records).to.exist;
    });

    it('has no records for dates before the projection range', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('1999/12/31'));
      expect(records).to.not.exist;
    });

    it('has no records for dates after projection range', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/02/01'));
      expect(records).to.not.exist;
    });

    it('has a record for the account on the first date of the projection range', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/01/01'));
      expect(records.forAccount('example')).to.exist;
    });

    it('has a record for the account on the last date of the projection range', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/01/31'));
      expect(records.forAccount('example')).to.exist;
    });
  });

  context('with an active loan account', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 0,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('does not change the balance without a budget', async () => {
      projectionOptions.budget = new Budget({ balance: 0, refreshAmount: 0 });
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(1000);
    });

    it('reduces the principal by the budget amount', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(900);
    });

    it('reduces the principal to zero when less than the budget amount', async () => {
      projectionOptions.accounts[0].principal = 99;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(0);
    });

    it('reduces the interest by the budget amount', async () => {
      projectionOptions.accounts[0].interest = 110;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/31'));
      expect(record.accountState.interest).to.equal(10);
    });

    it('reduces the interest to zero when less than the budget amount', async () => {
      projectionOptions.accounts[0].interest = 99;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/31'));
      expect(record.accountState.interest).to.equal(0);
    });

    it('reduces the interest before the principal', async () => {
      projectionOptions.accounts[0].interest = 90;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(990);
    });

    it('adjusts the balance on the next contribution date on the account', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/15'));
      expect(record.accountState.principal).to.equal(900);
    });

    it('does not adjust the balance before the next contribution date on the account', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example', new Day('2000/01/14'));
      expect(record.accountState.principal).to.equal(1000);
    });
  });

  context('with multiple active loan accounts', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        }),
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('uses all of the budget on the first account when none have minimum contributions', async () => {
      projectionOptions.accounts.forEach((account) => account.minimumPayment = 0);
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-2', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(1000);
    });

    it('adjusts the first account by its minimum contribution', async () => {
      projectionOptions.accounts[0].minimumPayment = 100;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/15'));
      expect(record.accountState.principal).to.equal(900);
    });

    it('adjusts other accounts by their minimum contributions', async () => {
      projectionOptions.accounts[1].minimumPayment = 90;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-2', new Day('2000/01/15'));
      expect(record.accountState.principal).to.equal(910);
    });

    it('adjusts the first account by its maximum contribution after adjusting by minimum contributions', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/15'));
      expect(record.accountState.principal).to.equal(920);
    });

    it('adjusts other accounts by their maximum contributions with remaining budget', async () => {
      projectionOptions.budget = new Budget({ balance: 1100, refreshAmount: 100 });
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-2', new Day('2000/01/15'));
      expect(record.accountState.principal).to.equal(900);
    });
  });

  context('with multiple active, interest-bearing loan accounts', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.01,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.02,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('accrues interest', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/14'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.36');
    });

    it('applies contributions after accruing interest', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/15'));
      expect(record.accountState.interest).to.equal(0);
    });

    it('continues accruing interest for an account on the next day after applying a contribution', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/16'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.03');
    });

    it('does not accrue interest on the starting update date', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/01'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.00');
    });

    it('accrues interest on dates between the account update date and the start of the cycle', async () => {
      projectionOptions.accounts[0].updateDate = '1999/12/25';
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('1999/12/31'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.16');
    });
  });

  context('when projecting over multiple cycles', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
      projectionOptions.endDate = '2000/03/31';
    });

    it('projects up to the given end date', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/03/31'));
      expect(records).to.exist;
    });

    it('stops projecting after the given end date', async () => {
      const history = await runProjection();
      const records = history.getRecordsOnDate(new Day('2000/04/01'));
      expect(records).not.to.exist;
    });

    it('refreshes the budget for each cycle', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/03/15'));
      expect(record.accountState.principal).to.equal(700);
    });

    it('updates account contribution dates for each cycle', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/02/15'));
      expect(record.accountState.principal).to.equal(800);
    });
  });

  describe('projection start dates for individual accounts', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/02'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/03'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('does not record individual account history prior to an account update date', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/01'));
      expect(record).to.not.exist;
    });

    it('records account history between the account update date and the start of the cycle', async () => {
      projectionOptions.accounts[0].updateDate = '1999/12/25';
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('1999/12/25'));
      expect(record).to.exist;
    });
  });

  // back-projects up to Day.today()
  // uses Day.today() for contribution date when next contribution date is in the past
  // does not do payments
  // includes a record for the starting update date
  // uses the updateDate as the starting point for accounts
  // with a cycle not aligned with calendar months
  // set the next payment date to null when the account has a zero balance
  // accounts for accrued interest in the cycle before making a contribution
  // when the account has no nextContributionDate (is paid off)
  // updates the updatedate for each account on each date with an event
});
