export default class Timeline {
  constructor () {
    this.data = [];
  }

  getEventsOnDate (date) {
    return this.data.filter(datum => datum.date === date);
  }

  getStateOnDate (date) {

  }
}
