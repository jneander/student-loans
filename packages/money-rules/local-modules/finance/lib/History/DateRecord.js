export default class DateRecord {
  constructor () {
    this._events = [];
    this._state = {};
  }

  setAccountState (account) {
    this._state[account.key] = account.toJSON();
  }

  addEvent (event) {
    this._events.push(event);
  }

  get events () {
    return this._events;
  }

  get state () {
    return { ...this._state };
  }

  stateForAccount (accountKey) {
    return this._state[accountKey];
  }
}
