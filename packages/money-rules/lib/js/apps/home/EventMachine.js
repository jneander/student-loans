import * as AccountAccessor from 'js/shared/accounts/AccountAccessor';
import * as PlanActions from 'js/shared/plans/PlanActions';
import * as PlanAccessor from 'js/shared/plans/PlanAccessor';

function planChanged (previousState, currentState) {
  const previousAccounts = AccountAccessor.getAccountList(previousState);
  const currentAccounts = AccountAccessor.getAccountList(currentState);

  let changed = previousAccounts !== currentAccounts;

  if (!changed) {
    const previousBudget = PlanAccessor.getBudget(previousState);
    const currentBudget = PlanAccessor.getBudget(currentState);
    changed = previousBudget !== currentBudget;
  }

  if (!changed) {
    const previousDebtStrategy = PlanAccessor.getDebtStrategy(previousState);
    const currentDebtStrategy = PlanAccessor.getDebtStrategy(currentState);
    changed = previousDebtStrategy !== currentDebtStrategy;
  }

  return changed;
}

export default class EventMachine {
  constructor (store) {
    this.store = store;
    this.previousState = store.getState();
  }

  onStateChange (previousState, currentState) {
    if (planChanged(previousState, currentState)) {
      this.store.dispatch(PlanActions.projectPlan());
    }
  }

  start () {
    this.unsubscribe = this.store.subscribe(() => {
      const currentState = this.store.getState();
      if (currentState !== this.previousState && !this.handlingStateChange) {
        this.handlingStateChange = true;

        const previousState = this.previousState;
        this.previousState = currentState;
        this.onStateChange(previousState, currentState);

        this.handlingStateChange = false
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
