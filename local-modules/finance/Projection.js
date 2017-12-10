import Day from 'units/Day';

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
    this.projection._timeline.forEach((dateActivityMap) => {
      this._timelineData[dateActivityMap.date.toString()] = new ProjectionState(dateActivityMap.date, dateActivityMap);
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
