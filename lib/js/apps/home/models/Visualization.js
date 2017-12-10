import { range } from 'units/Dates';

const DEFAULT_INCLUDES = ['payments'];

export default class Visualization {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
    // startDate
    // accounts/columns to include
    // projectionType -> visualizationType
    // includes
  }

  getColumnList () {
    return [
      { type: 'date' },
      ...this.options.accounts.map(account => ({ label: account.key, type: 'number' }))
    ];
  }

  getRowList () {
    const dateRange = range(this.options.startDate, this.options.endDate);
    let rows = [];

    for (let i = 0; i < dateRange.length; i++) {
      const currentDate = dateRange[i];
      const projectionState = this.projection.getStateAtDate(currentDate);
      const events = projectionState.getChangeList();

      if (events.length) {
        const eventMap = events.reduce((map, event) => ({ ...map, [event.key]: event.balance }), {});
        rows.push([
          currentDate.date(),
          ...this.options.accounts.map(account => eventMap[account.key])
        ]);
      }
    }

    return rows;
  }

  toTable () {
    // const includes = options.include || DEFAULT_INCLUDES;
    // const accountColumnIndexMap = accounts.reduce((map, account, index) => ({ ...map, [account.key]: index }), {});

    return { columns: this.getColumnList(), rows: this.getRowList() };
  }
}
