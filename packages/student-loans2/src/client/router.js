import {Router} from '@jneander/activity-routing'

const router = new Router()

router.add('home', '/')

router.context('loans', '/loans', context => {
  context.add('createLoan', '/new')
  context.add('updateLoan', '/:loanId/edit')
  context.add('showLoan', '/:loanId')
  context.add('listLoans', '(/)')
})

router.context('settings', '/settings', context => {
  context.add('showSettings', '(/)')
})

export default router // { match, urls }

export const {urls} = router
