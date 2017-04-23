import React from 'react';

import 'instructure-ui/lib/themes/canvas';
// import 'js/theme';

import loans from 'example-data/loans';

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';
import Breadcrumb, { BreadcrumbLink } from 'instructure-ui/lib/components/Breadcrumb';
import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import TabList from 'instructure-ui/lib/components/TabList';
import Typography from 'instructure-ui/lib/components/Typography';

import styles from 'styles/app.css';
import Loan from 'js/entities/Loan';
import LoanList from 'js/components/LoanList';
import LoansOverview from 'js/components/LoansOverview';
import ShowLoanInfo from 'js/components/ShowLoanInfo';

ApplyTheme.setDefaultTheme('canvas');

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loans,
      selectedLoan: null
    };

    this.onLoanClick = this.onLoanClick.bind(this);
  }

  onLoanClick (loan) {
    this.setState({ selectedLoan: loan });
  }

  render () {
    return (
      <div>
        <Container as="header" className={styles.Header}>
          <Heading level="h1">Student Loans</Heading>
        </Container>

        <div className={styles.Body}>
          <aside id="sidebar" role="complementary" className={styles.Sidebar}>
            <Heading level="h2">Loans</Heading>

            <LoanList loans={this.state.loans} onLoanClick={this.onLoanClick} />

            <Button variant="icon">+</Button>
          </aside>

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
      </div>
    );
  }
}

export default App;
