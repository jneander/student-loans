import Strategy from '../Strategy';

export default class Plan {
  constructor (options = {}) {
    this._options = { ...options };

    this._options.strategy = this._options.strategy || new Strategy();
  }

  set accounts (accounts) {
    this._options.accounts = accounts;
  }

  get accounts () {
    return this._options.accounts;
  }

  set budget (budget) {
    this._options.budget = budget;
  }

  get budget () {
    return this._options.budget;
  }

  set cycle (cycle) {
    this._options.cycle = cycle;
  }

  get cycle () {
    return this._options.cycle;
  }

  set endDate (endDate) {
    this._options.endDate = endDate;
  }

  get endDate () {
    return this._options.endDate;
  }

  set strategy (strategy) {
    this._options.strategy = strategy;
  }

  get strategy () {
    return this._options.strategy;
  }

  get steps () {
    return [];
  }
}
