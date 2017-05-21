import React from 'react';
import Button from 'instructure-ui/lib/components/Button';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/loans.css';
import { urls } from 'js/apps/loans/Router';
import LoanList from 'js/apps/loans/components/LoanList';
import ActivityLink from 'js/shared/components/ActivityLink';

class Sidebar extends React.PureComponent {
  render () {
    return (
      <aside id="sidebar" role="complementary" className={styles.Sidebar}>
        <Heading level="h2">Loans</Heading>

        <LoanList loans={this.props.loans} />

        <ActivityLink as="button" href={urls.createLoanUrl()} variant="primary">
          Add a Loan…
        </ActivityLink>
      </aside>
    );
  }
}

export default Sidebar;
