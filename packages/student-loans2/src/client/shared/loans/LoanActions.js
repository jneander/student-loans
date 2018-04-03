import * as LoanApi from './LoanApi'

export const FETCH_LOANS_STARTED = Symbol('FETCH_LOANS_STARTED')
export const FETCH_LOANS_SUCCESS = Symbol('FETCH_LOANS_SUCCESS')
export const FETCH_LOANS_FAILURE = Symbol('FETCH_LOANS_FAILURE')
export const CREATE_LOAN_STARTED = Symbol('CREATE_LOAN_STARTED')
export const CREATE_LOAN_SUCCESS = Symbol('CREATE_LOAN_SUCCESS')
export const CREATE_LOAN_FAILURE = Symbol('CREATE_LOAN_FAILURE')
export const UPDATE_LOAN_STARTED = Symbol('UPDATE_LOAN_STARTED')
export const UPDATE_LOAN_SUCCESS = Symbol('UPDATE_LOAN_SUCCESS')
export const UPDATE_LOAN_FAILURE = Symbol('UPDATE_LOAN_FAILURE')
export const DELETE_LOAN_STARTED = Symbol('DELETE_LOAN_STARTED')
export const DELETE_LOAN_SUCCESS = Symbol('DELETE_LOAN_SUCCESS')
export const DELETE_LOAN_FAILURE = Symbol('DELETE_LOAN_FAILURE')

export function fetchLoans() {
  return function(dispatch, getState) {
    dispatch({type: FETCH_LOANS_STARTED})
    LoanApi.fetchLoans()
      .then(data => {
        dispatch({type: FETCH_LOANS_SUCCESS, payload: {loans: data}})
      })
      .catch(error => {
        dispatch({type: FETCH_LOANS_FAILURE, payload: error})
      })
  }
}

export function createLoan(loan) {
  return function(dispatch, getState) {
    dispatch({type: CREATE_LOAN_STARTED})
    LoanApi.createLoan(loan)
      .then(datum => {
        dispatch({type: CREATE_LOAN_SUCCESS, payload: {loan: datum}})
      })
      .catch(error => {
        dispatch({type: CREATE_LOAN_FAILURE, payload: error})
      })
  }
}

export function updateLoan(loanId, loan) {
  return function(dispatch, getState) {
    dispatch({type: UPDATE_LOAN_STARTED})
    LoanApi.updateLoan(loanId, loan)
      .then(datum => {
        dispatch({type: UPDATE_LOAN_SUCCESS, payload: {loan: datum}})
      })
      .catch(error => {
        dispatch({type: UPDATE_LOAN_FAILURE, payload: error})
      })
  }
}

export function deleteLoan(loanId) {
  return function(dispatch, getState) {
    dispatch({type: DELETE_LOAN_STARTED, payload: {loanId}})
    LoanApi.deleteLoan(loanId)
      .then(() => {
        dispatch({type: DELETE_LOAN_SUCCESS, payload: {loanId}})
      })
      .catch(error => {
        dispatch({type: DELETE_LOAN_FAILURE, payload: {loanId, error}})
      })
  }
}
