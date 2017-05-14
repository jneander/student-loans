import Routing from 'routing';

const router = Routing.createRouter();

router.add('listLoans', '/loans');
router.add('showLoan', '/loans/:id');

export default router; // { match, routes }
