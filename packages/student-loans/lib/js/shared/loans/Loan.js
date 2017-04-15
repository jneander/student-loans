class Loan {
  constructor (attr = {}) {
    this.internals = { attr };
  }

  get id () {
    return this.internals.attr.id;
  }

  get name () {
    return this.internals.attr.name;
  }
}

export default Loan;
