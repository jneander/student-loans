import sinon from 'sinon';

import Day from 'units/Day';
import Month from 'units/Month';

describe('Month', () => {
  describe('initialization with month format (YYYY/MM)', () => {
    it('.startDate returns the first date of the month', () => {
      const month = new Month('2000/03');
      expect(month.startDate.toString()).to.equal('2000/03/01');
    });

    it('.endDate returns the first date of the month', () => {
      const month = new Month('2000/03');
      expect(month.endDate.toString()).to.equal('2000/03/31');
    });
  });

  describe(':thisMonth()', () => {
    it('returns the current month', () => {
      const clock = sinon.useFakeTimers(new Date('2000/03/05'));
      expect(Month.thisMonth().toString()).to.equal('2000/03');
      clock.restore();
    });
  });

  describe(':lastMonth()', () => {
    it('returns the current month', () => {
      const clock = sinon.useFakeTimers(new Date('2000/03/05'));
      expect(Month.lastMonth().toString()).to.equal('2000/02');
      clock.restore();
    });
  });

  describe(':nextMonth()', () => {
    it('returns the next month', () => {
      const clock = sinon.useFakeTimers(new Date('2000/03/05'));
      expect(Month.nextMonth().toString()).to.equal('2000/04');
      clock.restore();
    });
  });

  describe('.startDate', () => {
    it('returns the first date of the month', () => {
      const month = new Month('2000/01/05');
      expect(month.startDate.toString()).to.equal('2000/01/01');
    });
  });

  describe('.endDate', () => {
    it('returns the last day of the month for January', () => {
      const month = new Month('2000/01/05');
      expect(month.endDate.toString()).to.equal('2000/01/31');
    });

    it('returns the last day of the month for February in a leap year', () => {
      const month = new Month('2000/02/05');
      expect(month.endDate.toString()).to.equal('2000/02/29');
    });

    it('returns the last day of the month for February in a non- leap year', () => {
      const month = new Month('2001/02/05');
      expect(month.endDate.toString()).to.equal('2001/02/28');
    });

    it('returns the last day of the month for March', () => {
      const month = new Month('2000/03/05');
      expect(month.endDate.toString()).to.equal('2000/03/31');
    });

    it('returns the last day of the month for April', () => {
      const month = new Month('2000/04/30');
      expect(month.endDate.toString()).to.equal('2000/04/30');
    });

    it('returns the last day of the month for May', () => {
      const month = new Month('2000/05/05');
      expect(month.endDate.toString()).to.equal('2000/05/31');
    });

    it('returns the last day of the month for June', () => {
      const month = new Month('2000/06/30');
      expect(month.endDate.toString()).to.equal('2000/06/30');
    });

    it('returns the last day of the month for July', () => {
      const month = new Month('2000/07/05');
      expect(month.endDate.toString()).to.equal('2000/07/31');
    });

    it('returns the last day of the month for August', () => {
      const month = new Month('2000/08/05');
      expect(month.endDate.toString()).to.equal('2000/08/31');
    });

    it('returns the last day of the month for September', () => {
      const month = new Month('2000/09/30');
      expect(month.endDate.toString()).to.equal('2000/09/30');
    });

    it('returns the last day of the month for October', () => {
      const month = new Month('2000/10/05');
      expect(month.endDate.toString()).to.equal('2000/10/31');
    });

    it('returns the last day of the month for November', () => {
      const month = new Month('2000/11/30');
      expect(month.endDate.toString()).to.equal('2000/11/30');
    });

    it('returns the last day of the month for December', () => {
      const month = new Month('2000/12/05');
      expect(month.endDate.toString()).to.equal('2000/12/31');
    });
  });

  describe('.dates', () => {
    function dateRange (yearMonth, length) {
      return [...Array(length).keys()].map((v) => {
        const date = `${v + 1}`.padStart(2, '0');
        return `${yearMonth}/${date}`;
      });
    }

    it('returns all dates for the month for January', () => {
      const month = new Month('2000/01/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/01', 31));
    });

    it('returns all dates for the month for February in a leap year', () => {
      const month = new Month('2000/02/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/02', 29));
    });

    it('returns all dates for the month for February in a non- leap year', () => {
      const month = new Month('2001/02/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2001/02', 28));
    });

    it('returns all dates for the month for March', () => {
      const month = new Month('2000/03/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/03', 31));
    });

    it('returns all dates for the month for April', () => {
      const month = new Month('2000/04/30');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/04', 30));
    });

    it('returns all dates for the month for May', () => {
      const month = new Month('2000/05/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/05', 31));
    });

    it('returns all dates for the month for June', () => {
      const month = new Month('2000/06/30');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/06', 30));
    });

    it('returns all dates for the month for July', () => {
      const month = new Month('2000/07/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/07', 31));
    });

    it('returns all dates for the month for August', () => {
      const month = new Month('2000/08/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/08', 31));
    });

    it('returns all dates for the month for September', () => {
      const month = new Month('2000/09/30');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/09', 30));
    });

    it('returns all dates for the month for October', () => {
      const month = new Month('2000/10/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/10', 31));
    });

    it('returns all dates for the month for November', () => {
      const month = new Month('2000/11/30');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/11', 30));
    });

    it('returns all dates for the month for December', () => {
      const month = new Month('2000/12/05');
      expect(month.dates.map(date => date.toString())).to.deep.equal(dateRange('2000/12', 31));
    });
  });

  describe('.nextMonth', () => {
    it('returns the next month after January', () => {
      const month = new Month('2000/01/05');
      expect(month.nextMonth.toString()).to.equal('2000/02');
    });

    it('returns the next month after February in a leap year', () => {
      const month = new Month('2000/02/05');
      expect(month.nextMonth.toString()).to.equal('2000/03');
    });

    it('returns the next month after February in a non- leap year', () => {
      const month = new Month('2001/02/05');
      expect(month.nextMonth.toString()).to.equal('2001/03');
    });

    it('returns the next month after March', () => {
      const month = new Month('2000/03/05');
      expect(month.nextMonth.toString()).to.equal('2000/04');
    });

    it('returns the next month after April', () => {
      const month = new Month('2000/04/30');
      expect(month.nextMonth.toString()).to.equal('2000/05');
    });

    it('returns the next month after May', () => {
      const month = new Month('2000/05/05');
      expect(month.nextMonth.toString()).to.equal('2000/06');
    });

    it('returns the next month after June', () => {
      const month = new Month('2000/06/30');
      expect(month.nextMonth.toString()).to.equal('2000/07');
    });

    it('returns the next month after July', () => {
      const month = new Month('2000/07/05');
      expect(month.nextMonth.toString()).to.equal('2000/08');
    });

    it('returns the next month after August', () => {
      const month = new Month('2000/08/05');
      expect(month.nextMonth.toString()).to.equal('2000/09');
    });

    it('returns the next month after September', () => {
      const month = new Month('2000/09/30');
      expect(month.nextMonth.toString()).to.equal('2000/10');
    });

    it('returns the next month after October', () => {
      const month = new Month('2000/10/05');
      expect(month.nextMonth.toString()).to.equal('2000/11');
    });

    it('returns the next month after November', () => {
      const month = new Month('2000/11/30');
      expect(month.nextMonth.toString()).to.equal('2000/12');
    });

    it('returns the next month after December', () => {
      const month = new Month('2000/12/05');
      expect(month.nextMonth.toString()).to.equal('2001/01');
    });
  });

  describe('.lastMonth', () => {
    it('returns the previous month before January', () => {
      const month = new Month('2000/01/05');
      expect(month.lastMonth.toString()).to.equal('1999/12');
    });

    it('returns the previous month before February', () => {
      const month = new Month('2000/02/05');
      expect(month.lastMonth.toString()).to.equal('2000/01');
    });

    it('returns the previous month before March', () => {
      const month = new Month('2000/03/05');
      expect(month.lastMonth.toString()).to.equal('2000/02');
    });

    it('returns the previous month before April', () => {
      const month = new Month('2000/04/30');
      expect(month.lastMonth.toString()).to.equal('2000/03');
    });

    it('returns the previous month before May', () => {
      const month = new Month('2000/05/05');
      expect(month.lastMonth.toString()).to.equal('2000/04');
    });

    it('returns the previous month before June', () => {
      const month = new Month('2000/06/30');
      expect(month.lastMonth.toString()).to.equal('2000/05');
    });

    it('returns the previous month before July', () => {
      const month = new Month('2000/07/05');
      expect(month.lastMonth.toString()).to.equal('2000/06');
    });

    it('returns the previous month before August', () => {
      const month = new Month('2000/08/05');
      expect(month.lastMonth.toString()).to.equal('2000/07');
    });

    it('returns the previous month before September', () => {
      const month = new Month('2000/09/30');
      expect(month.lastMonth.toString()).to.equal('2000/08');
    });

    it('returns the previous month before October', () => {
      const month = new Month('2000/10/05');
      expect(month.lastMonth.toString()).to.equal('2000/09');
    });

    it('returns the previous month before November', () => {
      const month = new Month('2000/11/30');
      expect(month.lastMonth.toString()).to.equal('2000/10');
    });

    it('returns the previous month before December', () => {
      const month = new Month('2000/12/05');
      expect(month.lastMonth.toString()).to.equal('2000/11');
    });
  });

  describe('.getDate()', () => {
    it('returns the date for the given day within the month', () => {
      const month = new Month('2000/01');
      expect(month.getDate(10).toString()).to.equal('2000/01/10');
    });

    it('returns the last day of the month when given a date higher than the length of the month', () => {
      const month = new Month('2000/02');
      expect(month.getDate(31).toString()).to.equal('2000/02/29');
    });
  });
});
