export default class Presenter {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
  }

  forAccount (accountKey) {
    return this.projection._history.forAccount(accountKey);
  }

  get overallSummary () {
    let totalContribution = 0;

    this.options.accounts.forEach((account) => {
      const accountSummary = this.forAccount(account.key);
      totalContribution += accountSummary.totalContribution
    });

    return {
      totalContribution
    };
  }
}
