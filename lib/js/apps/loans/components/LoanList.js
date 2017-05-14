import React from 'React';

import Link from 'instructure-ui/lib/components/Link';

import styles from 'styles/loan-list.css';
import Urls from 'js/apps/loans/Urls';
import ActivityLink from 'js/shared/components/ActivityLink';

class LoanList extends React.PureComponent {
  render () {
    return (
      <ul className={styles.LoanList}>
        {
          this.props.loans.map(loan => (
            <li key={loan.id} className={styles.LoanList__Loan}>
              <ActivityLink ellipsis href={Urls.showLoanUrl(loan.id)}>{ loan.name }</ActivityLink>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default LoanList;
