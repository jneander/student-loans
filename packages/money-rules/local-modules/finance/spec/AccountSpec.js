import Account from 'finance/lib/Account';

describe('Account', () => {
  let account;

  beforeEach(() => {
    account = new Account({
      apr: 0.0565
    });
  });

  it('has an APR', () => {
    expect(account.apr).to.equal(0.0565);
  });
});
