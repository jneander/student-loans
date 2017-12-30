import React from 'react';
import { connect } from 'react-redux';

import Container from '@instructure/ui-core/lib/components/Container';
import Grid, { GridCol, GridRow } from '@instructure/ui-core/lib/components/Grid';
import Heading from '@instructure/ui-core/lib/components/Heading';
import Spinner from '@instructure/ui-core/lib/components/Spinner';
import TabList from '@instructure/ui-core/lib/components/TabList';
import Text from '@instructure/ui-core/lib/components/Text';

import styles from 'styles/loans.css';
import CreateLoan from 'js/apps/loans/components/CreateLoan';
import ShowLoansOverview from 'js/apps/loans/components/ShowLoansOverview';
import ShowLoan from 'js/apps/loans/components/ShowLoan';
import Sidebar from 'js/apps/loans/components/Sidebar';
import UpdateLoan from 'js/apps/loans/components/UpdateLoan';
import Activity from 'js/shared/components/Activity';
import AuthAccessor from 'js/shared/auth/AuthAccessor';
import LoanAccessor from 'js/shared/loans/LoanAccessor';

class Loans extends React.Component {
  render () {
    if (this.props.authState !== 'signedIn') {
      return <div />
    }

    if (this.props.fetchLoansStatus !== 'success') {
      return (
        <div className={styles.Body}>
          <Spinner title="Loans are being loaded" />
        </div>
      );
    }

    return (
      <div className={styles.Body}>
        <Sidebar loans={this.props.loans} />

        <main className={styles.Content}>
          <Activity name="listLoans">
            <ShowLoansOverview />
          </Activity>

          <Activity name="showLoan">
            <ShowLoan />
          </Activity>

          <Activity name="createLoan">
            <CreateLoan />
          </Activity>

          <Activity name="updateLoan">
            <UpdateLoan />
          </Activity>
        </main>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    activity: state.activity,
    authState: AuthAccessor.getAuthState(state),
    fetchLoansStatus: LoanAccessor.getFetchLoansStatus(state),
    loans: LoanAccessor.listLoans(state)
  };
}

export default connect(
  mapStateToProps
)(Loans);
