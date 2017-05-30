import LoanApi from 'js/shared/loans/LoanApi';
import ActionHelper from 'js/shared/helpers/ActionHelper';

const Constants = ActionHelper.createConstants([
  'FETCH_LOANS_STARTED',
  'FETCH_LOANS_SUCCESS',
  'FETCH_LOANS_FAILURE',
  'CREATE_LOAN_STARTED',
  'CREATE_LOAN_SUCCESS',
  'CREATE_LOAN_FAILURE',
  'UPDATE_LOAN_STARTED',
  'UPDATE_LOAN_SUCCESS',
  'UPDATE_LOAN_FAILURE',
  'DELETE_LOAN_STARTED',
  'DELETE_LOAN_SUCCESS',
  'DELETE_LOAN_FAILURE'
]);

const LoanActions = {
  ...Constants,

  fetchLoans () {
    return function (dispatch, getState) {
      dispatch({ type: Constants.FETCH_LOANS_STARTED });
      // LoanApi.deleteLoan('-KlORz06DB9UuVx13YFn');
      LoanApi.fetchLoans()
        .then((data) => {
          dispatch({ type: Constants.FETCH_LOANS_SUCCESS, payload: { loans: data } });
        })
        .catch((error) => {
          dispatch({ type: Constants.FETCH_LOANS_FAILURE, payload: error });
        });
    };
  },

  createLoan (loan) {
    return function (dispatch, getState) {
      dispatch({ type: Constants.CREATE_LOAN_STARTED });
      LoanApi.createLoan(loan)
        .then((datum) => {
          dispatch({ type: Constants.CREATE_LOAN_SUCCESS, payload: { loan: datum } });
        })
        .catch((error) => {
          dispatch({ type: Constants.CREATE_LOAN_FAILURE, payload: error });
        });
    }
  },

  updateLoan (loanId, loan) {
    return function (dispatch, getState) {
      dispatch({ type: Constants.UPDATE_LOAN_STARTED });
      LoanApi.updateLoan(loanId, loan)
        .then((datum) => {
          dispatch({ type: Constants.UPDATE_LOAN_SUCCESS, payload: { loan: datum } });
        })
        .catch((error) => {
          dispatch({ type: Constants.UPDATE_LOAN_FAILURE, payload: error });
        });
    }
  },

  deleteLoan (loanId) {
    return function (dispatch, getState) {
      dispatch({ type: Constants.DELETE_LOAN_STARTED });
      LoanApi.deleteLoan(loanId)
        .then(() => {
          dispatch({ type: Constants.DELETE_LOAN_SUCCESS });
        })
        .catch((error) => {
          dispatch({ type: Constants.DELETE_LOAN_FAILURE, payload: error });
        });
    }
  }
};

export default LoanActions;
