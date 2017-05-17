const Urls = {
  showHomeUrl () {
    return '/';
  },

  showSettingsUrl () {
    return '/settings/';
  },

  chooseFileUrl () {
    return '/config/choose-file';
  },

  showLoanUrl (loanId) {
    return `/loans/${loanId}`;
  },

  newLoanUrl () {
    return `/loans/new`;
  }
};

export default Urls;
