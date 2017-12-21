function compareApr (a, b) {
  if (a.apr === b.apr) {
    return 0;
  }
  return (a.apr > b.apr) ? 1 : -1;
}

function compareBalance (a, b) {
  if (a.balance === b.balance) {
    return 0;
  }
  return (a.balance > b.balance) ? 1 : -1;
}

function compareName (a, b) {
  return (a.name > b.name) ? 1 : -1;
}

export function prioritizeAccounts (accountStates, strategy = 'optimal') {
  switch (strategy) {
    case 'optimal': {
      return accounts.sort((a, b) => -compareApr(a, b) || compareBalance(a, b) || compareName(a, b));
    }
    case 'snowball': {
      return accounts.sort((a, b) => compareBalance(a, b) || compareName(a, b));
    }
    default: {
      return accounts;
    }
  }
}
