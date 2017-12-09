import ProjectionV1 from './lib/Projection/ProjectionV1';
import ProjectionState from './lib/Projection/ProjectionState';

function createDateKey (date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}/${month}/${day}`;
}

export default class Projection {
  constructor (options) {
    this.options = options;
  }

  run () {
    if (!this.projection) {
      this.projection = new ProjectionV1(this.options);
      this.projection.run();
    }

    this.timelineData = this.projection.timeline().reduce((map, dateActivityMap) => (
      { ...map, [createDateKey(dateActivityMap.date)]: dateActivityMap }
    ), {});
  }

  getStateAtDate (date) {
    const events = [];
    let timelineDatum = this.timelineData[date.toString()];

    if (timelineDatum) {
      timelineDatum = { ...timelineDatum };
      delete timelineDatum.date;
    } else {
      timelineDatum = {};
    }

    return { date, events: Object.values(timelineDatum) };
  }

  timeline2 () {
    // return this.projection.timeline();
  }

  timeline () {
    return this.projection.timeline();
  }
}
