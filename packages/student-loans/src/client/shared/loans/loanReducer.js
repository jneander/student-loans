import {thread} from '@jneander/state-utils/es/accessors'
import {buildReducer} from '@jneander/state-utils/es/reducers'

import LoanAccessor from './LoanAccessor'
import * as LoanActions from './LoanActions'

const handlers = {}

// FETCH_LOANS

handlers[LoanActions.FETCH_LOANS_STARTED] = (state, {payload}) =>
  LoanAccessor.setFetchLoansStatus(state, 'started')

handlers[LoanActions.FETCH_LOANS_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.setLoans(state, payload.loans),
    state => LoanAccessor.setFetchLoansStatus(state, 'success')
  )

handlers[LoanActions.FETCH_LOANS_FAILURE] = (state, {payload}) =>
  LoanAccessor.setFetchLoansStatus(state, 'failure')

// CREATE_LOAN

handlers[LoanActions.CREATE_LOAN_STARTED] = (state, {payload}) =>
  LoanAccessor.setCreateLoanStatus(state, 'started')

handlers[LoanActions.CREATE_LOAN_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.setLoan(state, payload.loan),
    state => LoanAccessor.setCreateLoanStatus(state, 'success')
  )

handlers[LoanActions.CREATE_LOAN_FAILURE] = (state, {payload}) =>
  LoanAccessor.setCreateLoanStatus(state, 'failure')

// UPDATE_LOAN

handlers[LoanActions.UPDATE_LOAN_STARTED] = (state, {payload}) =>
  LoanAccessor.setUpdateLoanStatus(state, 'started')

handlers[LoanActions.UPDATE_LOAN_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.setLoan(state, payload.loan),
    state => LoanAccessor.setUpdateLoanStatus(state, 'success')
  )

handlers[LoanActions.UPDATE_LOAN_FAILURE] = (state, {payload}) =>
  LoanAccessor.setUpdateLoanStatus(state, 'failure')

// DELETE_LOAN

handlers[LoanActions.DELETE_LOAN_STARTED] = (state, {payload}) =>
  LoanAccessor.setDeleteLoanStatus(state, 'started')

handlers[LoanActions.DELETE_LOAN_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.deleteLoan(state, payload.loanId),
    state => LoanAccessor.setDeleteLoanStatus(state, 'success')
  )

handlers[LoanActions.DELETE_LOAN_FAILURE] = (state, {payload}) =>
  LoanAccessor.setDeleteLoanStatus(state, 'failure')

export default buildReducer(handlers)
