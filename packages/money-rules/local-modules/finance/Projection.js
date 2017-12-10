import Day from 'units/Day';
import { range } from 'units/Dates';

import ProjectionV1 from './lib/Projection/ProjectionV1';
import ProjectionState from './lib/Projection/ProjectionState';

export default class Projection {
  constructor (options) {
    this.options = options;
  }

  run () {
    if (!this.projection) {
      this.projection = new ProjectionV1(this.options);
      this.projection.run();
    }

    this._timelineData = {};

    const dateRange = range(this.projection.startDate, this.projection.endDate);

    dateRange.forEach((date) => {
      const projectionDatum = this.projection.projectionsByDate[date.toString()] || {};
      this._timelineData[date.toString()] = new ProjectionState(date, projectionDatum);
    });
  }

  getStateAtDate (date) {
    const dateKey = date.toString();
    if (!this._timelineData[dateKey]) {
      this._timelineData[dateKey] = new ProjectionState(date); // empty state
    }
    return this._timelineData[dateKey];
  }
}
