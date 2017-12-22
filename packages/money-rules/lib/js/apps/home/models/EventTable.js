import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
import { range } from 'units/Dates';

const EVENT_TYPE_NAMES = {
  [CONTRIBUTION]: 'Contribution',
  [INTEREST]: 'Interest'
};

function createTableEvent (date, event, state) {
  const accountState = state[event.accountKey];

  return [
    date.toString(),
    accountState.principal.toFixed(2),
    event.accountKey,
    EVENT_TYPE_NAMES[event.type],
    (event.principal + event.interest).toFixed(2),
    event.principal.toFixed(2),
    event.interest.toFixed(2),
    0
  ];
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
      const { events, state } = this.projection._history.forDate(currentDate);

      const contributions = events.filter(event => event.type === CONTRIBUTION);

      for (let j = 0; j < contributions.length; j++) {
        rows.push(createTableEvent(currentDate, contributions[j], state));
      }
    }

    return rows;
  }

  toTable () {
    return { columns: this.getColumnList(), rows: this.getRowList() };
  }
}
