import Strategy from '../Strategy';

export default class BaseProjection {
  constructor (options = {}) {
    this._options = { ...options };

    this._options.strategy = this._options.strategy || new Strategy();

    this._history = new History();
    this._state = 'idle';
  }

  get aborted () {
    return this._state === 'aborted';
  }

  get finished () {
    return this._state === 'finished';
  }

  get started () {
    return this._state === 'started';
  }

  abort () {
    if (!this.finished) {
      this._state = 'aborted';
    }
  }

  async run () {
  }
}
