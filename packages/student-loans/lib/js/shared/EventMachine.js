import AuthAccessor from 'js/shared/auth/AuthAccessor'
import {fetchLoans} from 'js/shared/loans/LoanActions'
import SettingAccessor from 'js/shared/settings/SettingAccessor'

// TODO: rename to BackgroundJob or BackgroundState or ??

export default class EventMachine {
  static create (store, initialState) {
    const eventMachine = new EventMachine(store, initialState);
    eventMachine.listen();
    return eventMachine;
  }

  constructor (store, initialState) {
    this.store = store;
    this.onStateChange = this.onStateChange.bind(this);
    this.currentState = initialState;
    this.handling = false;
  }

  listen () {
    this.store.subscribe(() => {
      const nextState = this.store.getState();
      this.onStateChange(this.currentState, nextState);
      this.currentState = nextState;
    });
  }

  onStateChange (lastState, nextState) {
    if (!this.handling) {
      this.handling = true;
      // this.handleInitializeChange(lastState, nextState);
      this.handleAuthStateChange(lastState, nextState);
      this.handling = false;
    }
  }

  handleAuthStateChange (lastState, nextState) {
    const lastAuthState = AuthAccessor.getAuthState(lastState);
    const nextAuthState = AuthAccessor.getAuthState(nextState);

    if (lastAuthState === nextAuthState) {
      return;
    }

    if (nextAuthState === 'signedIn') {
      this.store.dispatch(fetchLoans());
    }
  }
}
