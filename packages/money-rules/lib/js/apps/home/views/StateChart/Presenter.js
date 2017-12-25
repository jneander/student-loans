import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
import { range } from 'units/Dates';

export default class Presenter {
  constructor (projection, options) {
    this.projection = projection;
    this.options = options;
  }

  get dataSpecs () {
    return this.options.accounts.map((account) => (
      { key: account.key, name: account.name }
    ));
  }

  get rows () {
    const dateRange = range(this.options.startDate, this.options.endDate);
    let rows = [];

    for (let i = 0; i < dateRange.length; i++) {
      const currentDate = dateRange[i];
      const dateRecord = this.projection._history.forDate(currentDate);

      if (dateRecord.events.some(event => event.type === CONTRIBUTION)) {
        const row = {
          date: currentDate.date().getTime()
        };

        for (let j = 0; j < this.options.accounts.length; j++) {
          const accountState = dateRecord.stateForAccount(this.options.accounts[j].key);
          row[this.options.accounts[j].key] = -accountState.principal;
        }

        rows.push(row);
      }
    }

    return rows;
  }
}
