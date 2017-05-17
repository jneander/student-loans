import React from 'react';
import { connect } from 'react-redux';

import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import TabList from 'instructure-ui/lib/components/TabList';
import Typography from 'instructure-ui/lib/components/Typography';

import styles from 'styles/loans.css';
import ChooseFile from 'js/apps/loans/activities/ChooseFile';
import LoansOverview from 'js/apps/loans/components/LoansOverview';
import ShowLoanInfo from 'js/apps/loans/components/ShowLoanInfo';
import LoanForm from 'js/apps/loans/components/LoanForm';
import Sidebar from 'js/apps/loans/components/Sidebar';
import Activity from 'js/shared/components/Activity';
import AuthAccessor from 'js/shared/auth/AuthAccessor';
import LoanAccessor from 'js/shared/loans/LoanAccessor';

class Loans extends React.Component {
  render () {
    if (this.props.authState !== 'signedIn') {
      return <div />
    }

    return (
      <div className={styles.Body}>
        <Sidebar loans={this.props.loans} />

        <main className={styles.Content}>
          <Activity name="chooseFile">
            <ChooseFile />
          </Activity>

          <Activity name="listLoans">
            <LoansOverview />
          </Activity>

          <Activity name="showLoan">
            <ShowLoanInfo />
          </Activity>

          <Activity names={['createLoan', 'editLoan']}>
            <LoanForm />
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
    loans: LoanAccessor.listLoans(state)
  };
}

export default connect(
  mapStateToProps
)(Loans);
