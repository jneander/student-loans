// import sinon from 'sinon';

// import LoanAccount from 'finance/lib/accounts/LoanAccount';
// import Cycle from 'finance/lib/Cycle';
// import Budget from 'finance/lib/Budget';
// import Plan from 'finance/lib/Plan';
// import { CONTRIBUTION, INTEREST } from 'finance/lib/Projection/Event';
// import Projection from 'finance/lib/Projection';
// import Day from 'units/Day';
// import DayRange from 'units/DayRange';

// describe('Projection', () => {
//   let clock;
//   let plan;
//   let projection;

//   async function runProjection () {
//     projection = new Projection(plan);
//     await projection.run();
//   }

//   function getAccountEvents (accountKey, date) {
//     const { events } = projection._history.forDate(date);
//     return events.filter(event => event.accountKey === accountKey);
//   }

//   function getStateOnDate (date) {
//     return projection._history.forDate(date).state;
//   }

//   function getSummaryOnDate (date) {
//     return projection._history.forDate(date).summary;
//   }

//   beforeEach(() => {
//     plan = new Plan({
//       accounts: [],
//       budget: new Budget({ balance: 100, refreshAmount: 100 }),
//       cycle: new Cycle({ startDate: new Day('2000/01/01'), startDay: 1 }),
//       endDate: '2000/01/31'
//     });
//     clock = sinon.useFakeTimers({ now: new Date('2000/01/01'), toFake: ['Date'] });
//   });

//   afterEach(() => {
//     clock.restore();
//   });

//   describe('account state', () => {
//     beforeEach(() => {
//       plan.accounts = [
//         new LoanAccount({
//           apr: 0.00,
//           interest: 0,
//           key: 'example-1',
//           nextPaymentDate: '2000/01/15',
//           minimumPayment: 0,
//           monthlyPaymentDay: 1,
//           principal: -1000,
//           updateDate: '2000/01/01'
//         }),
//         new LoanAccount({
//           apr: 0.00,
//           interest: 0,
//           key: 'example-2',
//           nextPaymentDate: '2000/01/15',
//           minimumPayment: 0,
//           monthlyPaymentDay: 1,
//           principal: -1000,
//           updateDate: '1999/12/31'
//         })
//       ];
//       plan.budget = new Budget({ balance: 100, refreshAmount: 100 });
//     });

//     it('does not include state before the initial account update date', async () => {
//       await runProjection();
//       const state = getStateOnDate(new Day('1999/12/31'));
//       expect(state).not.to.include.key('example-1');
//     });
//   });
// });
