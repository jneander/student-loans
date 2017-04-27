import React from 'react';
import { connect } from 'react-redux';

import 'instructure-ui/lib/themes/canvas';
// import 'js/theme';

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';
import Breadcrumb, { BreadcrumbLink } from 'instructure-ui/lib/components/Breadcrumb';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import TabList from 'instructure-ui/lib/components/TabList';
import Typography from 'instructure-ui/lib/components/Typography';

import styles from 'styles/app.css';
import LoansOverview from 'js/components/LoansOverview';
import ShowLoanInfo from 'js/components/ShowLoanInfo';
import Sidebar from 'js/components/Sidebar';
import LoanAccessor from 'js/shared/loans/LoanAccessor';

ApplyTheme.setDefaultTheme('canvas');

class Loans extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedLoan: null
    };

    this.onLoanClick = this.onLoanClick.bind(this);
  }

  onLoanClick (loan) {
    this.setState({ selectedLoan: loan });
  }

  render () {
    return (
      <div className={styles.Body}>
        <Sidebar loans={this.props.loans} onLoanClick={this.onLoanClick} />

        <main className={styles.Content}>
          <nav className={styles.Breadcrumbs}>
            <Breadcrumb>
              <BreadcrumbLink>Loans</BreadcrumbLink>
            </Breadcrumb>
          </nav>

          {
            this.state.selectedLoan ? (
              <ShowLoanInfo loan={this.state.selectedLoan} />
            ) : (
              <LoansOverview />
            )
          }
        </main>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    loans: LoanAccessor.listLoans(state)
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loans);
