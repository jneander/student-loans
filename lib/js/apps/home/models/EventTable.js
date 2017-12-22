import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
import { range } from 'units/Dates';

function createTableEvent () {

}

export default class EventTable {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
  }

  getColumnList () {
    return [
      { label: 'Date' },
      { label: 'Balance' },
      { label: 'Account' },
      { label: 'Type' },
      { label: 'Total' },
      { label: 'Principal' },
      { label: 'Interest' },
      { label: 'Other' }
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
    return { columns: this.getColumnList(), rows: this.getRowList() };
  }
}
