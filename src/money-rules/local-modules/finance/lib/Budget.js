export default class Budget {
  constructor (options = {}) {
    this._options = { ...options };

    this._state = {
      balance: options.balance || 0
    };
  }

  take (amount) {
    const taken = Math.min(this._state.balance, amount);
    this._state.balance -= taken;
    return taken;
  }

  adjustBalance (amount) {
    this._state.balance += amount;
  }

  set balance (amount) {
    this._state.balance = amount;
  }

  get balance () {
    return this._state.balance;
  }

  reload () {
    this._state.balance += this._options.refreshAmount;
  }
}
