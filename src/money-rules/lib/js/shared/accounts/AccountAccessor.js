import { merge, get, set } from 'redux-helpers/AccessorHelper';

export function getInitialState () {
  return {
    accounts: {
      cachedList: [],
      map: {},
      order: []
    }
  };
}

export function getAccountList (state) {
  return state.accounts.cachedList;
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

  const cachedList = order.map(accountKey => map[accountKey]);

  return set(state, 'accounts', { cachedList, map, order });
}
