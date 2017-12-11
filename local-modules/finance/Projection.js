import Day from 'units/Day';
import { range } from 'units/Dates';

import ProjectionV1 from './lib/Projection/ProjectionV1';
import ProjectionState from './lib/Projection/ProjectionState';

export default class Projection {
  constructor (options) {
    this.options = options;
  }

  run () {
    const onFinish = () => {
      this._timelineData = {};

      const projectionDates = this.projection.projectionDates;
      const dateRange = range(this.projection.startDate, this.projection.endDate);

      dateRange.forEach((date) => {
        const projectionDatum = this.projection.projectionsByDate[date.toString()] || {};
        this._timelineData[date.toString()] = new ProjectionState(date, projectionDatum);
      });

      this.options.onFinish();
    };

    if (!this.projection) {
      this.projection = new ProjectionV1({ ...this.options, onFinish });
      this.projection.run();
    }
  }

  getStateAtDate (date) {
    const dateKey = date.toString();
    if (!this._timelineData[dateKey]) {
      this._timelineData[dateKey] = new ProjectionState(date); // empty state
    }
    return this._timelineData[dateKey];
  }
}
