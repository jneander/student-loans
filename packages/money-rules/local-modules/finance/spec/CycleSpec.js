import Cycle from 'finance/lib/Cycle';
import Day from 'units/Day';

describe('Cycle', () => {
  describe('.create()', () => {
    it('uses the given start date when it matches the given day', () => {
      const cycle = Cycle.create(5, '2000/01/05');
      expect(cycle.startDate.toString()).to.equal('2000/01/05');
    });

    it('adjusts the start date backward when it is before the given day', () => {
      const cycle = Cycle.create(6, '2000/01/05');
      expect(cycle.startDate.toString()).to.equal('1999/12/06');
    });

    it('adjusts the start date backward when it is after the given day', () => {
      const cycle = Cycle.create(4, '2000/01/05');
      expect(cycle.startDate.toString()).to.equal('2000/01/04');
    });

    it('uses the first day of the month for the given start date when given an invalid day', () => {
      const cycle = Cycle.create('invalid', '2000/01/05');
      expect(cycle.startDate.toString()).to.equal('2000/01/01');
    });
  });

  describe('.startDate', () => {
    it('is the first date of the cycle', () => {
      const cycle = new Cycle({ startDate: '2000/01/05' });
      expect(cycle.startDate.toString()).to.equal('2000/01/05');
    });
  });

  describe('.endDate', () => {
    it('is the last date of the cycle', () => {
      const cycle = new Cycle({ startDate: '2000/01/05' });
      expect(cycle.endDate.toString()).to.equal('2000/02/04');
    });
  });

  describe('.lastCycle', () => {
    it('is the previous cycle', () => {
      const cycle = new Cycle({ startDate: '2000/01/05' });
      expect(cycle.lastCycle.startDate.toString()).to.equal('1999/12/05');
    });
  });

  describe('.nextCycle', () => {
    it('is the next cycle', () => {
      const cycle = new Cycle({ startDate: '2000/01/05' });
      expect(cycle.nextCycle.startDate.toString()).to.equal('2000/02/05');
    });
  });

  describe('.dates', () => {
    function dateRange (yearMonth, start, end) {
      return [...Array(end - start + 1).keys()].map((v) => {
        const date = `${v + start}`.padStart(2, '0');
        return `${yearMonth}/${date}`;
      });
    }

    it('includes all dates of the cycle', () => {
      const cycle = new Cycle({ startDate: '2000/01/05' });
      const expectedDates = dateRange('2000/01', 5, 31).concat(dateRange('2000/02', 1, 4));
      expect(cycle.dates.map(date => date.toString())).to.deep.equal(expectedDates);
    });
  });

  describe('.includes()', () => {
    const cycle = new Cycle({ startDate: '2000/01/05' });

    it('returns true when the given date is on the cycle start date', () => {
      expect(cycle.includes(new Day('2000/01/05'))).to.be.true;
    });

    it('returns true when the given date is between the cycle start and end dates', () => {
      expect(cycle.includes(new Day('2000/01/15'))).to.be.true;
    });

    it('returns true when the given date is on the cycle end date', () => {
      expect(cycle.includes(new Day('2000/02/04'))).to.be.true;
    });

    it('returns false when the given date is before the cycle start date', () => {
      expect(cycle.includes(new Day('2000/01/04'))).to.be.false;
    });

    it('returns false when the given date is after the cycle end date', () => {
      expect(cycle.includes(new Day('2000/02/05'))).to.be.false;
    });

    it('returns false when the given date is not defined', () => {
      expect(cycle.includes(null)).to.be.false;
    });
  });
});
