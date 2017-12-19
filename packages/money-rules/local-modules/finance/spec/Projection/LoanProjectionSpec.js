import sinon from 'sinon';

import LoanAccount from 'finance/lib/accounts/LoanAccount';
import Cycle from 'finance/lib/Cycle';
import Budget from 'finance/lib/Budget';
import Projection from 'finance/lib/Projection';
import Day from 'units/Day';
import DayRange from 'units/DayRange';

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

  describe('account state records', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 0,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 0,
          monthlyPaymentDay: 1,
          principal: 1000,
          updateDate: '1999/12/31'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('does not include a record before the initial account update date', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('1999/12/31'));
      expect(record).not.to.exist;
    });

    it('includes a record on the initial account update date', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/01'));
      expect(record).to.exist;
    });

    it('includes records from the initial account update date to the start of the first cycle', async () => {
      projectionOptions.accounts[0].updateDate = '1999/12/25';
      const history = await runProjection();
      new DayRange('1999/12/25', '1999/12/31').dates.forEach((date) => {
        const record = getAccountRecord(history, 'example-1', date);
        expect(record).to.exist;
      });
    });

    it('includes records for each date in the cycle', async () => {
      const history = await runProjection();
      new DayRange('2000/01/01', '2000/01/31').dates.forEach((date) => {
        const record = getAccountRecord(history, 'example-1', date);
        expect(record).to.exist;
      });
    });

    context('when projecting over multiple cycles', () => {
      beforeEach(() => {
        projectionOptions.endDate = '2000/03/31';
      });

      it('includes records up to the given end date', async () => {
        const history = await runProjection();
        const records = history.getRecordsOnDate(new Day('2000/03/31'));
        expect(records).to.exist;
      });

      it('does not include records after the given end date', async () => {
        const history = await runProjection();
        const records = history.getRecordsOnDate(new Day('2000/04/01'));
        expect(records).not.to.exist;
      });
    });

    context('with no accounts', () => {
      it('has no records', async () => {
        projectionOptions.accounts = [];
        const history = await runProjection();
        const records = history.getRecordsOnDate(new Day('2000/01/01'));
        expect(records.forAccount('example-1')).to.be.undefined;
      });
    });
  });

  describe('interest', () => {
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

    it('does not accrue interest on the initial account update date', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/01'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.00');
    });

    it('accrues interest between the initial account update date and the start of the cycle', async () => {
      projectionOptions.accounts[0].updateDate = '1999/12/25';
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('1999/12/31'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.16');
    });

    it('accrues interest between the cycle start date and the next contribution date', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/14'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.36');
    });

    it('continues accruing interest for an account on the next day after applying a contribution', async () => {
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/16'));
      expect(record.accountState.interest.toFixed(2)).to.equal('0.03');
    });
  });

  describe('contributions', () => {
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
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('adjusts the principal on the next contribution date', async () => {
      projectionOptions.accounts[1].minimumPayment = 0;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/15'));
      expect(record.accountState.principal).to.equal(900);
    });

    it('does not adjust the principal before the next contribution date', async () => {
      projectionOptions.accounts[1].minimumPayment = 0;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/14'));
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

    it('reduces the interest before the principal', async () => {
      projectionOptions.accounts[0].interest = 70;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(990);
    });

    it('reduces the principal to zero when less than the budget amount', async () => {
      projectionOptions.accounts[0].principal = 79;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(0);
    });

    it('reduces the interest to zero when less than the budget amount', async () => {
      projectionOptions.accounts[0].interest = 79;
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/31'));
      expect(record.accountState.interest).to.equal(0);
    });

    it('does not change the balance without a budget', async () => {
      projectionOptions.budget = new Budget({ balance: 0, refreshAmount: 0 });
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(1000);
    });

    it('does not apply contributions in the past', async () => {
      projectionOptions.accounts[0].nextContributionDate = '1999/12/31';
      projectionOptions.accounts[0].updateDate = '1999/12/31';
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('1999/12/31'));
      expect(record.accountState.principal).to.equal(1000);
    });

    it('uses the current date when the the next contribution date is in the past', async () => {
      projectionOptions.accounts[0].nextContributionDate = '1999/12/31';
      projectionOptions.accounts[0].updateDate = '1999/12/31';
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-1', new Day('2000/01/01'));
      expect(record.accountState.principal).to.equal(920);
    });

    it('uses all of the budget on the first account when none have minimum contributions', async () => {
      projectionOptions.accounts.forEach((account) => account.minimumPayment = 0);
      const history = await runProjection();
      const record = getAccountRecord(history, 'example-2', new Day('2000/01/31'));
      expect(record.accountState.principal).to.equal(1000);
    });

    context('with interest', () => {
      beforeEach(() => {
        projectionOptions.accounts[0].apr = 0.01;
        projectionOptions.accounts[1].apr = 0.02;
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
    });

    context('when projecting over multiple cycles', () => {
      beforeEach(() => {
        projectionOptions.endDate = '2000/03/31';
      });

      it('refreshes the budget for each cycle', async () => {
        const history = await runProjection();
        const record = getAccountRecord(history, 'example-1', new Day('2000/03/15'));
        expect(record.accountState.principal).to.equal(760);
      });

      it('updates account contribution dates for each cycle', async () => {
        const history = await runProjection();
        const record = getAccountRecord(history, 'example-1', new Day('2000/02/15'));
        expect(record.accountState.principal).to.equal(840);
      });
    });
  });

  // NO? with a cycle not aligned with calendar months
  // NO? set the next payment date to null when the account has a zero balance
  // updates the updatedate for each account on each date with an event
  // includes events (payment, interest accrued)
  // includes principal, interest, cumulativeinterest, etc. in account states
});
