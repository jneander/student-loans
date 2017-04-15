import React, {PureComponent} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Heading from '@instructure/ui-core/lib/components/Heading'

import ActivityLink from '../../../../shared/components/ActivityLink'
import {urls} from '../../Router'
import LoanList from '../LoanList'
import styles from './styles.css'

export default class Sidebar extends PureComponent {
  render() {
    return (
      <aside id="sidebar" role="complementary" className={styles.Sidebar}>
        <Heading level="h2">Loans</Heading>

        <LoanList loans={this.props.loans} />

        <ActivityLink as="button" href={urls.createLoanUrl()} variant="primary">
          Add a Loan…
        </ActivityLink>
      </aside>
    )
  }
}
