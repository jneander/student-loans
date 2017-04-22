import React from 'React';
import styles from 'styles/loan-list.css';

class LoanList extends React.Component {
  render () {
    return (
      <ul className={styles.LoanList}>
        {
          this.props.loans.map(loan => (
            <li key={loan.id}>
              <a>{ loan.name }</a>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default LoanList;
