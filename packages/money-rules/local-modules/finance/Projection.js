import Day from 'units/Day';
import DayRange from 'units/DayRange';

import ProjectionV1 from './lib/Projection/ProjectionV1';
import ProjectionState from './lib/Projection/ProjectionState';

export default class Projection {
  constructor (options) {
    this.options = options;
  }

  run () {
    const onFinish = () => {
      this._timelineData = {};

      const dateRange = new DayRange(this.projection.startDate, this.projection.endDate).dates;

      dateRange.forEach((date) => {
        this._timelineData[date.toString()] = this.projection.getStateAtDate(date);
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
