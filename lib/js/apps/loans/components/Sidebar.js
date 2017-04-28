import React from 'react';
import Button from 'instructure-ui/lib/components/Button';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/loans.css';
import LoanList from 'js/apps/loans/components/LoanList';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <aside id="sidebar" role="complementary" className={styles.Sidebar}>
        <Heading level="h2">Loans</Heading>

        <LoanList loans={this.props.loans} onLoanClick={this.props.onLoanClick} />

        <Button variant="primary" isBlock>Add a Loan</Button>
      </aside>
    );
  }
}

export default Sidebar;
