import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
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
      { label: 'Date', type: 'date' },
      ...this.options.accounts.map(account => ({ label: account.key, type: 'number' }))
    ];
  }

  getRowList () {
    const dateRange = range(this.options.startDate, this.options.endDate);
    let rows = [];

    for (let i = 0; i < dateRange.length; i++) {
      const currentDate = dateRange[i];
      const historyRecords = this.projection._history.getRecordsOnDate(currentDate);

      if (historyRecords && historyRecords.events.some(event => event.type === CONTRIBUTION)) {
        const accountColumns = this.options.accounts.map((account) => {
          const accountState = historyRecords.forAccount(account.key);
          return -accountState.accountState.principal;
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
    // const includes = options.include || DEFAULT_INCLUDES;
    // const accountColumnIndexMap = accounts.reduce((map, account, index) => ({ ...map, [account.key]: index }), {});

    return { columns: this.getColumnList(), rows: this.getRowList() };
  }
}
