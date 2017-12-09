const DEFAULT_INCLUDES = ['payments'];

function accountToColumn (account) {
  return { label: account.key, type: 'number' };
}

export default class Visualization {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
    // startDate
    // accounts/columns to include
    // projectionType -> visualizationType
    // includes
  }

  toTable () {
    const accounts = this.options.accounts;
    // const includes = options.include || DEFAULT_INCLUDES;
    // const accountColumnIndexMap = accounts.reduce((map, account, index) => ({ ...map, [account.key]: index }), {});

    const columns = [
      { type: 'date' },
      ...accounts.map(accountToColumn)
    ];

    let rows = [];
    let currentDate = this.options.startDate;
    while (currentDate.isOnOrBefore(this.options.endDate)) {
      const projectionState = this.projection.getStateAtDate(currentDate);
      if (projectionState.events.length) {
        const eventMap = projectionState.events.reduce((map, event) => ({ ...map, [event.key]: event.balance }), {});
        rows.push([
          currentDate.date(),
          ...accounts.map(account => eventMap[account.key])
        ]);
      }
      currentDate = currentDate.offset({ days: 1 });
    }

    // rows = this.projection.timeline().map((dateActivityMap) => [
    //   dateActivityMap.date,
    //   ...accounts.map(account => dateActivityMap[account.key] ? dateActivityMap[account.key].balance : null)
    // ]);

    return { columns, rows };
  }
}
