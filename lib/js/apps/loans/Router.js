import Router from 'routing/lib/Router';

const router = new Router();

router.add('home', '/');
router.add('createLoan', '/loans/new');
router.add('editLoan', '/loans/:loanId/edit');
router.add('showLoan', '/loans/:loanId');
router.add('listLoans', '/loans/');

export default router; // { match, urls }
