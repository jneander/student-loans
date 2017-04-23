import React from 'React';

import Link from 'instructure-ui/lib/components/Link';

import styles from 'styles/loan-list.css';

class LoanList extends React.Component {
  constructor (props) {
    super(props);

    this.boundLoans = this.props.loans.map(loan => (
      {
        loan,
        onClick: () => {
          this.props.onLoanClick(loan);
        }
      }
    ))
  }

  render () {
    return (
      <ul className={styles.LoanList}>
        {
          this.boundLoans.map(({ loan, onClick }) => (
            <li key={loan.id} className={styles.LoanList__Loan}>
              <Link ellipsis onClick={onClick}>{ loan.name }</Link>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default LoanList;
