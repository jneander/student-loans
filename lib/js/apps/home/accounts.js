import { Account } from 'finance';
import { thisMonth } from 'units/Dates';

const accounts = [
  new Account({
    apr: 0.0593,
    date: thisMonth(),
    interest: 0.0,
    key: 'AES',
    minimum: 79.35,
    name: 'Chase (Fall 2005)',
    principal: 8658.35
  }),

  new Account({
    apr: 0.0232,
    date: thisMonth(),
    interest: 0.0,
    key: 'M1',
    minimum: 7.87,
    name: 'Mohela 1 Direct Sub Stafford',
    principal: 2072.67
  }),

  new Account({
    apr: 0.0232,
    date: thisMonth(),
    interest: 0.0,
    key: 'M2',
    minimum: 4.69,
    name: 'Mohela 3 Direct Unsubsidized',
    principal: 1088.78
  }),

  new Account({
    apr: 0.068,
    date: thisMonth(),
    interest: 0.0,
    key: 'M3',
    minimum: 39.44,
    name: 'Mohela 5 Direct Unsubsidized',
    principal: 7014.84
  }),

  new Account({
    apr: 0.0647,
    date: thisMonth(),
    interest: 0.0,
    key: 'E1',
    minimum: 1095.0,
    name: 'Earnest Consolidation Loan',
    principal: 78511.60
  })
];

export default accounts;
