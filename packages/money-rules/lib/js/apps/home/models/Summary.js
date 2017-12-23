export default class Summary {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
  }

  forAccount (accountKey) {
    return this.projection._history.getAccountSummary(accountKey);
  }

  // payoff date
  // total interest accrued
  // total contributions
}
