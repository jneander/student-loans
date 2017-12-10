import Account from 'finance/lib/Account';

import { accountData } from 'js/apps/home/data';

export const ADD_ACCOUNTS = 'ADD_ACCOUNTS';

export function initialize () {
  return function (dispatch, getState) {
    const accounts = accountData.map(accountDatum => new Account(accountDatum));
    dispatch(addAccounts(accounts));
  }
}

export function addAccounts (accounts) {
  return { type: ADD_ACCOUNTS, payload: { accounts } };
}
