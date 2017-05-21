import React from 'React';

import Link from 'instructure-ui/lib/components/Link';

import styles from 'styles/loan-list.css';
import router from 'js/apps/loans/Router';
import ActivityLink from 'js/shared/components/ActivityLink';

const { urls } = router;

class LoanList extends React.PureComponent {
  render () {
    const loanId = this.props.loans[0].id;
    return (
      <ul className={styles.LoanList}>
        {
          this.props.loans.map(loan => (
            <li key={loan.id} className={styles.LoanList__Loan}>
              <ActivityLink ellipsis href={urls.showLoanUrl(loan.id)}>{ loan.name }</ActivityLink>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default LoanList;
