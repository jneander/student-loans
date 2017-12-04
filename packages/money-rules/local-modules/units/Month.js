export default class Month {
  constructor (date) {
    this._date = date;
  }

  days () {
    const today = new Date();
    const startDate = new Date(this._date.getYear(), this._date.getMonth() + num, 1);
    const endDate = new Date(startDate.getYear(), startDate.getMonth() + 1, 1);
    return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
  }

  next () {
    return new Month(new Date(this._date.getYear(), this._date.getMonth() + 1, 1));
  }
}
