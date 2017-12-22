function compareApr (a, b) {
  if (a.apr === b.apr) {
    return 0;
  }
  return (a.apr > b.apr) ? 1 : -1;
}

function compareBalance (a, b) {
  const balanceA = a.principal + a.interest;
  const balanceB = b.principal + b.interest;

  if (balanceA === balanceB) {
    return 0;
  }
  return (balanceA < balanceB) ? 1 : -1;
}

function compareKey (a, b) {
  return (a.key > b.key) ? 1 : -1;
}

export function prioritizeAccounts (accounts, strategy = 'none') {
  switch (strategy) {
    case 'optimal': {
      return accounts.sort((a, b) => -compareApr(a, b) || compareBalance(a, b) || compareKey(a, b));
    }
    case 'snowball': {
      return accounts.sort((a, b) => compareBalance(a, b) || compareKey(a, b));
    }
    default: {
      return accounts;
    }
  }
}
