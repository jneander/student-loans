import FirebaseClient from 'js/wrappers/FirebaseClient';

const LoanApi = {
  fetchLoans () {
    return new Promise((resolve, reject) => {
      FirebaseClient.getAll('loans')
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  createLoan (loan) {
    return new Promise((resolve, reject) => {
      FirebaseClient.add('loans', loan)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  updateLoan (loanId, loan) {
    return new Promise((resolve, reject) => {
      FirebaseClient.set('loans', loanId, loan)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  deleteLoan (loanId) {
    return new Promise((resolve, reject) => {
      FirebaseClient.remove('loans', loanId)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default LoanApi;
