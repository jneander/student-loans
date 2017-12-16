import LoanAccount from 'finance/lib/accounts/LoanAccount';

function createAccount (options = {}) {
  return new LoanAccount({
    interest: 0,
    key: 'example',
    minimumPayment: 0,
    principal: 0,
    ...options
  });
}

describe('LoanAccount', () => {
  describe('.key', () => {
    it('is the given key', () => {
      const account = createAccount({ key: 'example' });
      expect(account.key).to.equal('example');
    });
  });

  describe('.balance', () => {
    it('is zero when principal and interest are zero', () => {
      const account = createAccount({ principal: 0, interest: 0 });
      expect(account.balance).to.equal(0);
    });

    it('subtracts principal and interest from zero', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      expect(account.balance).to.equal(-30);
    });
  });

  describe('.adjustBalance()', () => {
    it('subtracts the given amount from interest', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      account.adjustBalance(10);
      expect(account.interest).to.equal(0);
    });

    it('does not subtract more interest than present', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      account.adjustBalance(40);
      expect(account.interest).to.equal(0);
    });

    it('subtracts the given amount from principal', () => {
      const account = createAccount({ principal: 20, interest: 0 });
      account.adjustBalance(20);
      expect(account.principal).to.equal(0);
    });

    it('does not subtract more principal than present', () => {
      const account = createAccount({ principal: 20, interest: 0 });
      account.adjustBalance(40);
      expect(account.principal).to.equal(0);
    });

    it('adjusts interest before adjusting principal', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      account.adjustBalance(25);
      expect(account.principal).to.equal(5);
    });

    it('negative adjustments increase interest', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      account.adjustBalance(-30);
      expect(account.interest).to.equal(40);
    });

    it('negative adjustments do not increase principal', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      account.adjustBalance(-30);
      expect(account.principal).to.equal(20);
    });
  });

  describe('.minimumContribution', () => {
    it('is equal to the minimum payment', () => {
      const account = createAccount({ principal: 100, interest: 0, minimumPayment: 10 });
      expect(account.minimumContribution).to.equal(10);
    });

    it('is zero when principal and interest are zero', () => {
      const account = createAccount({ principal: 0, interest: 0 });
      expect(account.minimumContribution).to.equal(0);
    });

    it('is the principal plus interest when the minimum payment is higher than both', () => {
      const account = createAccount({ principal: 20, interest: 10, minimumPayment: 70 });
      expect(account.minimumContribution).to.equal(30);
    });
  });

  describe('.maximumContribution', () => {
    it('is the principal plus interest', () => {
      const account = createAccount({ principal: 20, interest: 10 });
      expect(account.maximumContribution).to.equal(30);
    });
  });
});
