import React, {PureComponent} from 'react'
import Link from '@instructure/ui-core/lib/components/Link'

import ActivityLink from '../../../../shared/components/ActivityLink'
import router from '../../Router'
import styles from './styles.css'

const {urls} = router

export default class LoanList extends PureComponent {
  render() {
    return (
      <ul className={styles.LoanList}>
        {this.props.loans.map(loan => (
          <li key={loan.id} className={styles.LoanList__Loan}>
            <ActivityLink ellipsis href={urls.showLoanUrl(loan.id)}>
              {loan.name}
            </ActivityLink>
          </li>
        ))}
      </ul>
    )
  }
}
