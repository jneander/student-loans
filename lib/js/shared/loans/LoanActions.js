import ActionHelper from 'js/shared/helpers/ActionHelper';
import GoogleApiClient from 'js/wrappers/GoogleApiClient';

const Constants = ActionHelper.createConstants([
  'LIST_LOANS_STARTED'
]);

const LoanActions = {
  ...Constants,

  listFiles () {
    return function (dispatch, getState) {
    }
  }
};

export default LoanActions;
