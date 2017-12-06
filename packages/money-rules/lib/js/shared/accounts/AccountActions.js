import { createConstants } from 'redux-helpers/ActionHelper';

const Constants = createConstants([
  'ADD_ACCOUNTS'
]);

export { Constants };

export function addAccounts (accountList) {
  // …
}
