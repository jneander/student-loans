import { merge, get, set } from 'redux-helpers/AccessorHelper';
import accounts from 'js/apps/home/accounts';

export function getInitialState () {
  return {
    accounts: {
      map: accounts.reduce((map, account) => ({ ...map, [account.key]: account }), {}),
      order: accounts.map(account => account.key)
    }
  };
}

export function listAccounts (state) {
  // return accounts;
  return state.accounts.order.map(accountKey => state.accounts.map[accountKey]);
}

export function addAccounts (state, accounts) {
  const map = { ...state.accounts.map };
  const order = [...state.accounts.order];

  accounts.forEach((account) => {
    if (!map[account.key]) {
      map[account.key] = account;
      order.push(account.key);
    }
  });

  return set(state, 'accounts', { map, order });
}
