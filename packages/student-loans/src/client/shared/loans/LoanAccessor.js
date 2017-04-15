import {set, unset} from '@jneander/state-utils/es/accessors'

export const FETCH_LOANS_FAILURE = Symbol('FETCH_LOANS_FAILURE')
export const FETCH_LOANS_STARTED = Symbol('FETCH_LOANS_STARTED')
export const FETCH_LOANS_SUCCESS = Symbol('FETCH_LOANS_SUCCESS')
export const CREATE_LOAN_FAILURE = Symbol('CREATE_LOAN_FAILURE')
export const CREATE_LOAN_STARTED = Symbol('CREATE_LOAN_STARTED')
export const CREATE_LOAN_SUCCESS = Symbol('CREATE_LOAN_SUCCESS')
export const UPDATE_LOAN_FAILURE = Symbol('UPDATE_LOAN_FAILURE')
export const UPDATE_LOAN_STARTED = Symbol('UPDATE_LOAN_STARTED')
export const UPDATE_LOAN_SUCCESS = Symbol('UPDATE_LOAN_SUCCESS')
export const DELETE_LOAN_FAILURE = Symbol('DELETE_LOAN_FAILURE')
export const DELETE_LOAN_STARTED = Symbol('DELETE_LOAN_STARTED')
export const DELETE_LOAN_SUCCESS = Symbol('DELETE_LOAN_SUCCESS')

export function getInitialState() {
  return {
    loans: {
      fetchLoansStatus: 'idle',
      createLoanStatus: 'idle',
      updateLoanStatus: 'idle',
      deleteLoanStatus: 'idle',
      map: {}
    }
  }
}

export function setLoans(state, loanMap) {
  return set(state, 'loans.map', loanMap)
}

export function listLoans(state) {
  return Object.keys(state.loans.map).map(key => state.loans.map[key])
}

export function getLoan(state, loanId) {
  return state.loans.map[loanId]
}

export function setLoan(state, loan) {
  return set(state, `loans.map.${loan.id}`, loan)
}

export function deleteLoan(state, loanId) {
  return unset(state, `loans.map.${loanId}`)
}

export function setFetchLoansStatus(state, status) {
  return set(state, 'loans.fetchLoansStatus', status)
}

export function getFetchLoansStatus(state) {
  return state.loans.fetchLoansStatus
}

export function setCreateLoanStatus(state, status) {
  return set(state, 'loans.createLoanStatus', status)
}

export function getCreateLoanStatus(state) {
  return state.loans.createLoanStatus
}

export function setUpdateLoanStatus(state, status) {
  return set(state, 'loans.updateLoanStatus', status)
}

export function getUpdateLoanStatus(state) {
  return state.loans.updateLoanStatus
}

export function setDeleteLoanStatus(state, status) {
  return set(state, 'loans.deleteLoanStatus', status)
}

export function getDeleteLoanStatus(state) {
  return state.loans.deleteLoanStatus
}
