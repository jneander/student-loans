const Urls = {
  showHomeUrl () {
    return '/';
  },

  showLoanUrl (loanId) {
    return `/loans/${loanId}`;
  },

  newLoanUrl () {
    return `/loans/new`;
  }
};

export default Urls;
