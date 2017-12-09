import AccountState from './AccountState';
import Timeline from './Timeline';

function calculateRecentAccountStates (accounts, adjustments) {

}

function getCurrentAccountStates (accounts, adjustments, currentDate) {
  const mostRecentAccountStates = accounts.map((account) => {
    const 
  });
}

export default class Projection {
  constructor (accounts, adjustments, budget, dateRange) {
    this.accounts = accounts;
    this.adjustments = adjustments;
    this.budget = budget;
    this.dateRange = dateRange;
    this.timeline = new Timeline();
  }

  run () {
    const currentAccountStates = getCurrentAccountStates(this.accounts, this.adjustments, this.dateRange.current);
    console.log(currentAccountStates);
    // const events = projectAccounts(this.accounts, this.budget
  }
}
