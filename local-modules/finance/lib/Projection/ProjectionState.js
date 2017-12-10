export default class ProjectionState {
  constructor (date, stateData = {}) {
    this.date = date; // day
    this.stateData = {
      accountStates: {},
      changes: [],
      ...stateData
    };
  }

  getChangeList () {
    return this.stateData.changes;
  }

  getAccountState (accountKey) {
    return this.stateData.accountStates[accountKey];
  }

  getTotalBalance () {

  }

  getTotalDebtInterestPayment () {

  }

  getNetInterest () {

  }

  getCumulativeInterest () {

  }
}
