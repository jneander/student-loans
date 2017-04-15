import {thread} from '@jneander/state-utils/es/accessors'
import {buildReducer} from '@jneander/state-utils/es/reducers'

import * as LoanAccessor from './LoanAccessor'
import * as LoanActions from './LoanActions'

const handlers = {}

// FETCH_LOANS

handlers[LoanActions.FETCH_LOANS_STARTED] = (state, {payload}) =>
  LoanAccessor.setFetchLoansStatus(state, LoanAccessor.FETCH_LOANS_STARTED)

handlers[LoanActions.FETCH_LOANS_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.setLoans(state, payload.loans),
    state => LoanAccessor.setFetchLoansStatus(state, LoanAccessor.FETCH_LOANS_SUCCESS)
  )

handlers[LoanActions.FETCH_LOANS_FAILURE] = (state, {payload}) =>
  LoanAccessor.setFetchLoansStatus(state, LoanAccessor.FETCH_LOANS_FAILURE)

// CREATE_LOAN

handlers[LoanActions.CREATE_LOAN_STARTED] = (state, {payload}) =>
  LoanAccessor.setCreateLoanStatus(state, LoanAccessor.CREATE_LOAN_STARTED)

handlers[LoanActions.CREATE_LOAN_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.setLoan(state, payload.loan),
    state => LoanAccessor.setCreateLoanStatus(state, LoanAccessor.CREATE_LOAN_SUCCESS)
  )

handlers[LoanActions.CREATE_LOAN_FAILURE] = (state, {payload}) =>
  LoanAccessor.setCreateLoanStatus(state, LoanAccessor.CREATE_LOAN_FAILURE)

// UPDATE_LOAN

handlers[LoanActions.UPDATE_LOAN_STARTED] = (state, {payload}) =>
  LoanAccessor.setUpdateLoanStatus(state, LoanAccessor.UPDATE_LOAN_STARTED)

handlers[LoanActions.UPDATE_LOAN_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.setLoan(state, payload.loan),
    state => LoanAccessor.setUpdateLoanStatus(state, LoanAccessor.UPDATE_LOAN_SUCCESS)
  )

handlers[LoanActions.UPDATE_LOAN_FAILURE] = (state, {payload}) =>
  LoanAccessor.setUpdateLoanStatus(state, LoanAccessor.UPDATE_LOAN_FAILURE)

// DELETE_LOAN

handlers[LoanActions.DELETE_LOAN_STARTED] = (state, {payload}) =>
  LoanAccessor.setDeleteLoanStatus(state, LoanAccessor.DELETE_LOAN_STARTED)

handlers[LoanActions.DELETE_LOAN_SUCCESS] = (currentState, {payload}) =>
  thread(
    currentState,
    state => LoanAccessor.deleteLoan(state, payload.loanId),
    state => LoanAccessor.setDeleteLoanStatus(state, LoanAccessor.DELETE_LOAN_SUCCESS)
  )

handlers[LoanActions.DELETE_LOAN_FAILURE] = (state, {payload}) =>
  LoanAccessor.setDeleteLoanStatus(state, LoanAccessor.DELETE_LOAN_FAILURE)

export default buildReducer(handlers)
