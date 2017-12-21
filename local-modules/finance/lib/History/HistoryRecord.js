class AccountState {
  constructor (account) {
    this._account = account;
  }

  get interest () {
    return this._account.interest;
  }

  get principal () {
    return this._account.principal;
  }
}

class AccountHistoryRecord {
  constructor (account) {
    this.accountState = new AccountState(account);
    this.events = [];
  }

  updateAccountState (account) {
    this.accountState = new AccountState(account);
  }

  addEvent (event) {
    this.events.push(event);
  }
}

export default class HistoryRecord {
  constructor (date) {
    this.date = date;
    this._accountMap = {};
  }

  setAccountRecord (account) {
    if (this._accountMap[account.key]) {
      this._accountMap[account.key].updateAccountState(account.clone());
    } else {
      this._accountMap[account.key] = new AccountHistoryRecord(account.clone());
    }
  }

  addEvent (event) {
    this._accountMap[event.accountKey].addEvent(event);
  }

  get events () {
    return Object.keys(this._accountMap).reduce((events, accountKey) => {
      const accountRecord = this._accountMap[accountKey];
      if (accountRecord) {
        return events.concat(accountRecord.events);
      }
      return events;
    }, []);
  }

  get state () {
    return Object.keys(this._accountMap).reduce((state, accountKey) => {
      const accountRecord = this._accountMap[accountKey];
      if (accountRecord) {
        state[accountKey] = accountRecord.accountState;
      }
      return state;
    }, {});
  }

  forAccount (accountKey) {
    return this._accountMap[accountKey];
  }
}
