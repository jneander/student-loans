import Cycle from 'finance/lib/Cycle';

describe('Cycle', () => {
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
});
