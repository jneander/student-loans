import Day from 'units/Day';

describe('Day', () => {
  describe('.offsetYear', () => {
    it('returns the same day of a future year', () => {
      const day = new Day('2000/01/01');
      expect(day.offsetYear(3).toString()).to.equal('2003/01/01');
    });

    it('returns the same day of a previous year', () => {
      const day = new Day('2000/01/01');
      expect(day.offsetYear(-3).toString()).to.equal('1997/01/01');
    });

    it('returns February 28th when offsetting leap day to a non- leap year', () => {
      const day = new Day('2000/02/29');
      expect(day.offsetYear(3).toString()).to.equal('2003/02/28');
    });
  });

  describe('.offsetMonth', () => {
    it('returns the same day of a future month', () => {
      const day = new Day('2000/01/31');
      expect(day.offsetMonth(2).toString()).to.equal('2000/03/31');
    });

    it('returns the same day of a previous month', () => {
      const day = new Day('2000/01/31');
      expect(day.offsetMonth(-1).toString()).to.equal('1999/12/31');
    });

    it('returns the same day of a longer future month', () => {
      const day = new Day('2000/04/30');
      expect(day.offsetMonth(1).toString()).to.equal('2000/05/30');
    });

    it('returns the same day of a longer previous month', () => {
      const day = new Day('2000/04/30');
      expect(day.offsetMonth(-1).toString()).to.equal('2000/03/30');
    });

    it('returns the latest earlier day of a shorter future month', () => {
      const day = new Day('2000/01/31');
      expect(day.offsetMonth(1).toString()).to.equal('2000/02/29');
    });

    it('returns the latest earlier day of a shorter previous month', () => {
      const day = new Day('2000/01/31');
      expect(day.offsetMonth(-11).toString()).to.equal('1999/02/28');
    });
  });

  describe('.offsetDay', () => {
    it('returns a future day', () => {
      const day = new Day('2000/01/25');
      expect(day.offsetDay(10).toString()).to.equal('2000/02/04');
    });

    it('returns a previous day', () => {
      const day = new Day('2000/01/05');
      expect(day.offsetDay(-10).toString()).to.equal('1999/12/26');
    });
  });
});
