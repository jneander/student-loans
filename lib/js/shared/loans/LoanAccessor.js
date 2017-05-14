import loans from 'example-data/loans';

const LoanAccessor = {
  getInitialState () {
    return {
      loans: {
        list: loans
      }
    };
  },

  listLoans (state) {
    return loans;
    return state.loans.list;
  },

  getLoan (state, loanId) {
    return loans.find(loan => loan.id === loanId);
  }
};

export default LoanAccessor;
