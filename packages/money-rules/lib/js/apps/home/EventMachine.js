import * as AccountAccessor from 'js/shared/accounts/AccountAccessor';
import * as PlanActions from 'js/shared/plans/PlanActions';

export default class EventMachine {
  constructor (store) {
    this.store = store;
    this.previousState = store.getState();
  }

  onStateChange (previousState, currentState) {
    const previousAccounts = AccountAccessor.listAccounts(previousState);
    const currentAccounts = AccountAccessor.listAccounts(currentState);
    if (previousAccounts !== currentAccounts) {
      setTimeout(() => {
        this.store.dispatch(PlanActions.projectPlan());
      });
    }
  }

  start () {
    this.unsubscribe = this.store.subscribe(() => {
      const currentState = this.store.getState();
      if (currentState !== this.previousState) {
        const previousState = this.previousState;
        this.previousState = currentState;
        this.onStateChange(previousState, currentState);
      }
    });
  }

  stop () {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}
