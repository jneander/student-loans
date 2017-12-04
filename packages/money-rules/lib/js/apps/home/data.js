import { Account, Projection } from 'finance';
import { thisMonth } from 'units/Dates';

const accounts = [
  new Account({
    key: 'AES',
    principal: 10000.0,
    apr: 0.1,
    minimum: 10.0,
    interest: 0.0,
    date: thisMonth()
  })
];

const projection = new Projection(accounts, 1000, thisMonth());

projection.run();

const data = [
  { date: new Date('2018/01/01'), balance: 1000.00 },
  { date: new Date('2018/02/01'), balance: 900.00 },
  { date: new Date('2018/03/01'), balance: 800.00 },
  { date: new Date('2018/04/01'), balance: 700.00 },
  { date: new Date('2018/05/01'), balance: 600.00 }
];

const formattedData = projection.payments.map(datum => [datum.date, datum.balance]);

export default formattedData;
