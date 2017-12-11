import sinon from 'sinon';

import Account from 'finance/lib/Account';
import Projection from 'finance/lib/Projection';
import Day from 'units/Day';

describe('Projection', () => {
  function setCurrentDate (dateString) {
    const today = new Date(dateString);
    Day.today.returns(new Day(today));
  }

  beforeEach(() => {
    sinon.stub(Day, 'today');
    setCurrentDate('2015/06/01');
  });

  afterEach(() => {
    Day.today.restore();
  });

  context('with one account', () => {
    let accounts;
    let budget = 1000;
    let projection;

    before(() => {
      accounts = [
        new Account({
          apr: 0.05,
          key: 'loan-1',
          minimum: 10,
          monthlyBillingDate: 7,
          monthlyDueDate: 28,
          monthlyPaymentDate: 28,
          name: 'Fall 2005',
          originalPrincipal: 10000,
          originationDate: '2005/09/01',
          payoffDate: '2031/03/28',
          type: 'loan'
        })
      ];
      projection = new Projection({ accounts, budget });
      projection.run();
    });

    it('works', () => {
      expect(true).to.equal(true);
    });
  });
});
