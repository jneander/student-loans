import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from '@instructure/ui-core/lib/components/Container'
import Grid, {GridCol, GridRow} from '@instructure/ui-core/lib/components/Grid'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Spinner from '@instructure/ui-core/lib/components/Spinner'
import TabList from '@instructure/ui-core/lib/components/TabList'
import Text from '@instructure/ui-core/lib/components/Text'

import Activity from '../../shared/components/Activity'
import * as AuthAccessor from '../../shared/auth/AuthAccessor'
import * as LoanAccessor from '../../shared/loans/LoanAccessor'
import CreateLoan from './components/CreateLoan'
import ShowLoansOverview from './components/ShowLoansOverview'
import ShowLoan from './components/ShowLoan'
import Sidebar from './components/Sidebar'
import UpdateLoan from './components/UpdateLoan'
import styles from './styles.css'

class Loans extends Component {
  render() {
    if (this.props.authState !== AuthAccessor.SIGNED_IN) {
      return <div />
    }

    if (this.props.fetchLoansStatus !== LoanAccessor.FETCH_LOANS_SUCCESS) {
      return (
        <div className={styles.Body}>
          <Spinner title="Loans are being loaded" />
        </div>
      )
    }

    return (
      <div className={styles.Body}>
        <Sidebar loans={this.props.loans} />

        <main className={styles.Content}>
          <Activity name="listLoans">
            <ShowLoansOverview />
          </Activity>

          <Activity name="showLoan">
            <ShowLoan />
          </Activity>

          <Activity name="createLoan">
            <CreateLoan />
          </Activity>

          <Activity name="updateLoan">
            <UpdateLoan />
          </Activity>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    activity: state.activity,
    authState: AuthAccessor.getAuthState(state),
    fetchLoansStatus: LoanAccessor.getFetchLoansStatus(state),
    loans: LoanAccessor.listLoans(state)
  }
}

export default connect(mapStateToProps)(Loans)
