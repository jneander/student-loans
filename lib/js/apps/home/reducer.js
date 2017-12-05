import * as Actions from './Actions';

const handlers = {};

handlers[Actions.ADD_ACCOUNTS] = (state, { payload }) => {
  return {
    ...state,
    accounts: state.accounts
  };
};

export default function reducer (state, action) {
  return state;
}
