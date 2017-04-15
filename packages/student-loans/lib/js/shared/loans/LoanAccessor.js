import AccessorHelper from 'js/shared/helpers/AccessorHelper';

const LoanAccessor = {
  getInitialState () {
    return {
      loans: {
        fetchLoansStatus: 'idle',
        createLoanStatus: 'idle',
        updateLoanStatus: 'idle',
        deleteLoanStatus: 'idle',
        map: {}
      }
    };
  },

  setLoans (state, loanMap) {
    return AccessorHelper.set(state, 'loans.map', loanMap);
  },

  listLoans (state) {
    return Object.keys(state.loans.map).map(key => state.loans.map[key]);
  },

  getLoan (state, loanId) {
    return state.loans.map[loanId];
  },

  setLoan (state, loan) {
    return AccessorHelper.set(state, `loans.map.${loan.id}`, loan);
  },

  deleteLoan (state, loanId) {
    return AccessorHelper.unset(state, `loans.map.${loanId}`);
  },

  setFetchLoansStatus (state, status) {
    return AccessorHelper.set(state, 'loans.fetchLoansStatus', status);
  },

  getFetchLoansStatus (state) {
    return state.loans.fetchLoansStatus;
  },

  setCreateLoanStatus (state, status) {
    return AccessorHelper.set(state, 'loans.createLoanStatus', status);
  },

  getCreateLoanStatus (state) {
    return state.loans.createLoanStatus;
  },

  setUpdateLoanStatus (state, status) {
    return AccessorHelper.set(state, 'loans.updateLoanStatus', status);
  },

  getUpdateLoanStatus (state) {
    return state.loans.updateLoanStatus;
  },

  setDeleteLoanStatus (state, status) {
    return AccessorHelper.set(state, 'loans.deleteLoanStatus', status);
  },

  getDeleteLoanStatus (state) {
    return state.loans.deleteLoanStatus;
  }
};

export default LoanAccessor;
