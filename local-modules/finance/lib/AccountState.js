export default class AccountState {
  constructor (account, state = {}) {
    this.account = account;
    this.state = {
      interest: 0,
      principal: 0,
      ...state
    };
  }

  getPrincipal () {
    return this.state.principal;
  }

  getInterest () {
    return this.state.interest;
  }

  getBalance () {
    return this.getPrincipal() + this.getInterest();
  }

  adjustBalance (amount) {
  }

  applyInterest (days) {
    const periodRate = !!days ? (this.apr * days / 365) : this.apr / 12;
    this.interest += floatToDollars(this.principal * periodRate);
  }
}
