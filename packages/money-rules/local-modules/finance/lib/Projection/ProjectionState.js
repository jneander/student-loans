export default class ProjectionState {
  constructor (date, stateData = {}) {
    this.date = date; // day
    this.stateData = {
      changes: [],
      ...stateData
    };
  }

  getChangeList () {
    return this.stateData.changes;
  }

  getAccountState (accountKey) {

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
