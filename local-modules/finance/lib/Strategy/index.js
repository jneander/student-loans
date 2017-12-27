import * as DebtPriority from './DebtPriority';

export default class Strategy {
  constructor (options = {}) {
    this._options = { ...options };
  }

  prioritizeAccounts (accounts) {
    return DebtPriority.prioritizeAccounts([...accounts], this._options.debtPriority);
  }
}
