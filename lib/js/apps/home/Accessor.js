import { Account, Projection } from 'finance';
import { thisMonth } from 'units/Dates';

import accounts from './accounts';

const _projection = new Projection(accounts, 1300, thisMonth());

_projection.run();



export function initialState () {
  return {
    accounts: {
      map: {},
      order: []
    }
  };
}

export function listAccounts (state) {
  return accounts;
  // return state.accounts.order.map(accountKey => state.accounts.map[accountKey]);
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

  return {
    ...state,
    accounts: {
      ...state.accounts,
      map,
      order
    }
  };
}

export function projection (state) {
  return _projection;
}
