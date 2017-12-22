import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
import { range } from 'units/Dates';

export default class StateChart {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
  }

  getColumnList () {
    return [
      { label: 'Date', type: 'date' },
      ...this.options.accounts.map(account => ({ label: account.key, type: 'number' }))
    ];
  }

  getRowList () {
    const dateRange = range(this.options.startDate, this.options.endDate);
    let rows = [];

    for (let i = 0; i < dateRange.length; i++) {
      const currentDate = dateRange[i];
      const dateRecord = this.projection._history.forDate(currentDate);

      if (dateRecord.events.some(event => event.type === CONTRIBUTION)) {
        const accountColumns = this.options.accounts.map((account) => {
          const accountState = dateRecord.stateForAccount(account.key);
          return -accountState.principal;
        });

        rows.push([
          currentDate.date(),
          ...accountColumns
        ]);
      }
    }

    return rows;
  }

  toTable () {
    return { columns: this.getColumnList(), rows: this.getRowList() };
  }
}
