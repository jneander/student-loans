import sinon from 'sinon';

import LoanAccount from 'finance/lib/accounts/LoanAccount';
import Cycle from 'finance/lib/Cycle';
import Budget from 'finance/lib/Budget';
import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
import Projection from 'finance/lib/Projection';
import Day from 'units/Day';
import DayRange from 'units/DayRange';

describe('Projection', () => {
  let clock;
  let projectionOptions;
  let projection;

  async function runProjection () {
    projection = new Projection(projectionOptions);
    await projection.run();
  }

  function getAccountEvents (accountKey, date) {
    const { events } = projection._history.forDate(date);
    return events.filter(event => event.accountKey === accountKey);
  }

  function getStateOnDate (date) {
    return projection._history.forDate(date).state;
  }

  function getSummaryOnDate (date) {
    return projection._history.forDate(date).summary;
  }

  beforeEach(() => {
    projectionOptions = {
      accounts: [],
      budget: new Budget({ balance: 100, refreshAmount: 100 }),
      cycle: new Cycle({ startDate: new Day('2000/01/01'), startDay: 1 }),
      endDate: '2000/01/31'
    };
    clock = sinon.useFakeTimers({ now: new Date('2000/01/01'), toFake: ['Date'] });
  });

  afterEach(() => {
    clock.restore();
  });

  describe('account state', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 0,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 0,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '1999/12/31'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('does not include state before the initial account update date', async () => {
      await runProjection();
      const state = getStateOnDate(new Day('1999/12/31'));
      expect(state).not.to.include.key('example-1');
    });

    it('includes state on the initial account update date', async () => {
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/01'));
      const keys = Object.keys(state);
      expect(state).to.include.key('example-1');
    });

    it('includes state from the initial account update date to the start of the first cycle', async () => {
      projectionOptions.accounts[0].updateDate = '1999/12/25';
      await runProjection();
      new DayRange('1999/12/25', '1999/12/31').dates.forEach((date) => {
        const state = getStateOnDate(date);
        expect(state).not.to.be.empty;
      });
    });

    it('includes state for each date in the cycle', async () => {
      await runProjection();
      new DayRange('2000/01/01', '2000/01/31').dates.forEach((date) => {
        const state = getStateOnDate(date);
        expect(state).not.to.be.empty;
      });
    });

    context('when projecting over multiple cycles', () => {
      beforeEach(() => {
        projectionOptions.endDate = '2000/03/31';
      });

      it('includes state up to the given end date', async () => {
        await runProjection();
        const state = getStateOnDate(new Day('2000/03/31'));
        expect(state).not.to.be.empty;
      });

      it('does not include state after the given end date', async () => {
        await runProjection();
        const state = getStateOnDate(new Day('2000/04/01'));
        expect(state).to.be.empty;
      });
    });

    context('with no accounts', () => {
      it('has no account state', async () => {
        projectionOptions.accounts = [];
        await runProjection();
        const state = getStateOnDate(new Day('2000/01/01'));
        expect(state).to.be.empty;
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
          principal: -1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.02,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('does not accrue on the initial account update date', async () => {
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/01'));
      expect(state['example-1'].interest.toFixed(2)).to.equal('0.00');
    });

    it('accrues between the initial account update date and the start of the cycle', async () => {
      projectionOptions.accounts[0].updateDate = '1999/12/25';
      await runProjection();
      const state = getStateOnDate(new Day('1999/12/31'));
      expect(state['example-1'].interest.toFixed(2)).to.equal('-0.16');
    });

    it('accrues between the cycle start date and the next contribution date', async () => {
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/14'));
      expect(state['example-1'].interest.toFixed(2)).to.equal('-0.36');
    });

    it('continues accruing for an account on the next day after applying a contribution', async () => {
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/16'));
      expect(state['example-1'].interest.toFixed(2)).to.equal('-0.03');
    });

    it('accrues only for dates in the cycle when the next contribution date is after the cycle', async () => {
      projectionOptions.accounts[0].nextPaymentDate = '2000/02/01';
      await runProjection();
      const state = getStateOnDate(new Day('2000/02/01'));
      expect(state).to.be.empty;
    });
  });

  describe('interest events', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.01,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.02,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('adds an event on dates when interest is accrued', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/02'));
      expect(events).to.have.lengthOf(1);
    });

    it('does not have an interest event on the initial account update date', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/01'));
      expect(events).to.have.lengthOf(0);
    });

    it('does not have an interest event on dates when no interest is accrued', async () => {
      projectionOptions.accounts[0].apr = 0;
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/02'));
      expect(events).to.have.lengthOf(0);
    });

    it('includes the account key with the interest event', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/02'));
      expect(events[0].accountKey).to.equal('example-1');
    });

    it('includes the date with the interest event', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/02'));
      expect(events[0].date.toString()).to.equal('2000/01/02');
    });

    it('includes the amount of interest accrued with the interest event', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/02'));
      expect(events[0].amount.toFixed(2)).to.equal('-0.03');
    });

    it('includes "interest" as the event type', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/02'));
      expect(events[0].type).to.equal(INTEREST);
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
          principal: -1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('adjusts the principal on the next contribution date', async () => {
      projectionOptions.accounts[1].minimumPayment = 0;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/15'));
      expect(state['example-1'].principal).to.equal(-900);
    });

    it('does not adjust the principal before the next contribution date', async () => {
      projectionOptions.accounts[1].minimumPayment = 0;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/14'));
      expect(state['example-1'].principal).to.equal(-1000);
    });

    it('adjusts the first account by its minimum contribution', async () => {
      projectionOptions.accounts[0].minimumPayment = 100;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/15'));
      expect(state['example-1'].principal).to.equal(-900);
    });

    it('adjusts other accounts by their minimum contributions', async () => {
      projectionOptions.accounts[1].minimumPayment = 90;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/15'));
      expect(state['example-2'].principal).to.equal(-910);
    });

    it('adjusts the first account by its maximum contribution after adjusting by minimum contributions', async () => {
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/15'));
      expect(state['example-1'].principal).to.equal(-920);
    });

    it('adjusts other accounts by their maximum contributions with remaining budget', async () => {
      projectionOptions.budget = new Budget({ balance: 1100, refreshAmount: 100 });
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/15'));
      expect(state['example-2'].principal).to.equal(-900);
    });

    it('reduces the interest before the principal', async () => {
      projectionOptions.accounts[0].interest = -70;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/31'));
      expect(state['example-1'].principal).to.equal(-990);
    });

    it('reduces the principal to zero when less than the budget amount', async () => {
      projectionOptions.accounts[0].principal = -79;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/31'));
      expect(state['example-1'].principal).to.equal(0);
    });

    it('reduces the interest to zero when less than the budget amount', async () => {
      projectionOptions.accounts[0].interest = -79;
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/31'));
      expect(state['example-1'].interest).to.equal(0);
    });

    it('does not change the balance without a budget', async () => {
      projectionOptions.budget = new Budget({ balance: 0, refreshAmount: 0 });
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/31'));
      expect(state['example-1'].principal).to.equal(-1000);
    });

    it('does not apply contributions in the past', async () => {
      projectionOptions.accounts[0].nextContributionDate = '1999/12/31';
      projectionOptions.accounts[0].updateDate = '1999/12/31';
      await runProjection();
      const state = getStateOnDate(new Day('1999/12/31'));
      expect(state['example-1'].principal).to.equal(-1000);
    });

    it('uses the current date when the the next contribution date is in the past', async () => {
      projectionOptions.accounts[0].nextContributionDate = '1999/12/31';
      projectionOptions.accounts[0].updateDate = '1999/12/31';
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/01'));
      expect(state['example-1'].principal).to.equal(-920);
    });

    it('uses all of the budget on the first account when none have minimum contributions', async () => {
      projectionOptions.accounts.forEach((account) => account.minimumPayment = 0);
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/31'));
      expect(state['example-2'].principal).to.equal(-1000);
    });

    // TODO: this must happen when there is extra budget and the account has higher priority
    // it('does not apply a contribution without a next contribution date', async () => {
    //   projectionOptions.accounts[0].nextContributionDate = null;
    //   await runProjection();
    //   const state = getStateOnDate(new Day('2000/01/31'));
    //   expect(state['example-1'].principal).to.equal(-1000);
    // });

    it('does not apply a contribution in the current cycle when next contribution date is after the cycle', async () => {
      projectionOptions.accounts[0].nextContributionDate = '2000/02/01';
      await runProjection();
      const state = getStateOnDate(new Day('2000/01/31'));
      expect(state['example-1'].principal).to.equal(-1000);
    });

    context('with interest', () => {
      beforeEach(() => {
        projectionOptions.accounts[0].apr = 0.01;
        projectionOptions.accounts[1].apr = 0.02;
      });

      it('applies contributions after accruing interest', async () => {
        await runProjection();
        const state = getStateOnDate(new Day('2000/01/15'));
        expect(state['example-1'].interest).to.equal(0);
      });

      it('continues accruing interest for an account on the next day after applying a contribution', async () => {
        await runProjection();
        const state = getStateOnDate(new Day('2000/01/16'));
        expect(state['example-1'].interest.toFixed(2)).to.equal('-0.03');
      });
    });

    context('when projecting over multiple cycles', () => {
      beforeEach(() => {
        projectionOptions.endDate = '2000/03/31';
      });

      it('refreshes the budget for each cycle', async () => {
        await runProjection();
        const state = getStateOnDate(new Day('2000/03/15'));
        expect(state['example-1'].principal).to.equal(-760);
      });

      it('updates account contribution dates for each cycle', async () => {
        await runProjection();
        const state = getStateOnDate(new Day('2000/02/15'));
        expect(state['example-1'].principal).to.equal(-840);
      });

      it('applies the next contribution in the next cycle when next contribution date is after the current cycle', async () => {
        projectionOptions.accounts[0].nextContributionDate = '2000/02/01';
        await runProjection();
        const state = getStateOnDate(new Day('2000/02/15'));
        expect(state['example-1'].principal).to.equal(-920);
      });
    });
  });

  describe('contribution events', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    it('does not have a contribution event on days without a contribution', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/01'));
      expect(events).to.be.empty;
    });

    it('adds an event on dates when a contribution is made', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events).to.have.lengthOf(1);
    });

    it('includes the account key with the contribution event', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events[0].accountKey).to.equal('example-1');
    });

    it('includes the date with the contribution event', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events[0].date.toString()).to.equal('2000/01/15');
    });

    it('includes the interest amount of the contribution with the contribution event', async () => {
      projectionOptions.accounts[0].interest = -10;
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events[0].interest).to.equal(10);
    });

    it('includes the principal amount of the contribution with the contribution event', async () => {
      projectionOptions.accounts[0].interest = -10;
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events[0].principal).to.equal(70);
    });

    it('includes "contribution" as the event type', async () => {
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events[0].type).to.equal(CONTRIBUTION);
    });

    it('includes both interest and contribution events when both occur on the same date', async () => {
      projectionOptions.accounts[0].apr = 0.01;
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events).to.have.lengthOf(2);
    });

    it('includes interest events before contribution events', async () => {
      projectionOptions.accounts[0].apr = 0.01;
      await runProjection();
      const events = getAccountEvents('example-1', new Day('2000/01/15'));
      expect(events.map(event => event.type)).to.deep.equal([INTEREST, CONTRIBUTION]);
    });

    it('does not include a contribution event when the contribution amount is zero', async () => {
      projectionOptions.accounts[0].minimumPayment = 100;
      await runProjection();
      const events = getAccountEvents('example-2', new Day('2000/01/15'));
      expect(events).to.be.empty;
    });

    context('when the minimum contribution covers less than the accrued interest', () => {
      it('sets the interest to the interest portion of the payment', async () => {
        projectionOptions.accounts[0].interest = -100;
        projectionOptions.accounts[1].minimumPayment = 100;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].interest).to.equal(10);
      });

      it('sets the principal to zero', async () => {
        projectionOptions.accounts[0].interest = -100;
        projectionOptions.accounts[1].minimumPayment = 100;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].principal).to.equal(0);
      });
    });

    context('when the minimum contribution covers more than the accrued interest', () => {
      it('sets the interest to the interest portion of the payment', async () => {
        projectionOptions.accounts[0].interest = -5;
        projectionOptions.accounts[1].minimumPayment = 100;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].interest).to.equal(5);
      });

      it('sets the principal to the remainder of the payment', async () => {
        projectionOptions.accounts[0].interest = -5;
        projectionOptions.accounts[1].minimumPayment = 100;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].principal).to.equal(5);
      });
    });

    context('when the overall contribution covers less than the accrued interest', () => {
      it('sets the interest to the interest portion of the payment', async () => {
        projectionOptions.accounts[0].interest = -100;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].interest).to.equal(80);
      });

      it('sets the principal to zero', async () => {
        projectionOptions.accounts[0].interest = -100;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].principal).to.equal(0);
      });
    });

    context('when the overall contribution covers more than the accrued interest', () => {
      it('sets the interest to the interest portion of the payment', async () => {
        projectionOptions.accounts[0].interest = -5;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].interest).to.equal(5);
      });

      it('sets the principal to the remainder of the payment', async () => {
        projectionOptions.accounts[0].interest = -5;
        await runProjection();
        const events = getAccountEvents('example-1', new Day('2000/01/15'));
        expect(events[0].principal).to.equal(75);
      });
    });
  });

  describe('cumulative contribution', () => {
    beforeEach(() => {
      projectionOptions.accounts = [
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-1',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 10,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        }),
        new LoanAccount({
          apr: 0.00,
          interest: 0,
          key: 'example-2',
          nextPaymentDate: '2000/01/15',
          minimumPayment: 20,
          monthlyPaymentDay: 1,
          principal: -1000,
          updateDate: '2000/01/01'
        })
      ];
      projectionOptions.budget = new Budget({ balance: 100, refreshAmount: 100 });
    });

    // it includes the initial cumulative values

    // it('does not have a contribution event on days without a contribution', async () => {
    //   await runProjection();
    //   const summary = getSummaryOnDate(new Day('2000/01/01'));
    //   expect(summary['example-1']).to.equal(0);
    // });
  });

  // NO? with a cycle not aligned with calendar months
  // NO? set the next payment date to null when the account has a zero balance

  // updates the updatedate for each account on each date with an event
  // includes principal, interest, cumulativeinterest, etc. in account states

  // contributions to accounts without a next contribution date (no contribution required) NOT FOR LOAN ACCOUNTS
});
