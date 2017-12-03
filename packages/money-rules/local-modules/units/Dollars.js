export function roundToDollars (value) {
  return Math.round(value * 100) / 100.0;
}

export function floatToDollars (value) {
  return Math.round(value * 100) / 100.0;
}

export function stringToDollars (value) {
  return roundToDollars(parseFloat(value));
}

export default class Dollars {
  constructor (value) {
    this.cents = Math.round(value * 100);
  }

  add (value) {
    this.cents += Math.round(value * 100);
  }

  toFloat () {
    return this.cents / 100.0;
  }
}
