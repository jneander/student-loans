import React from 'react'
import {connect} from 'react-redux'
import Alert from '@instructure/ui-core/lib/components/Alert'
import Button from '@instructure/ui-core/lib/components/Button'
import Grid, {GridCol, GridRow} from '@instructure/ui-core/lib/components/Grid'
import Heading from '@instructure/ui-core/lib/components/Heading'
import IconEditLine from 'instructure-icons/lib/Line/IconEditLine'
import IconTrashLine from 'instructure-icons/lib/Line/IconTrashLine'
import TabList, {TabPanel} from '@instructure/ui-core/lib/components/TabList'
import Text from '@instructure/ui-core/lib/components/Text'

import AdjustmentsTable from '../AdjustmentsTable'
import {getLoan} from '../../../../shared/loans/LoanAccessor'
import {deleteLoan} from '../../../../shared/loans/LoanActions'
import {replaceQuery} from '../../../../shared/routing/RoutingActions'

import styles from './styles.css'
import Summary from './Summary'

const tabNames = ['summary', 'adjustments']

class ShowLoanInfo extends React.Component {
  constructor(props) {
    super(props)

    this.handleTabChange = index => {
      this.props.onTabChange(tabNames[index])
    }

    this.handleDelete = () => {
      this.props.onDeleteLoan(this.props.loan.id)
    }
  }

  render() {
    if (!this.props.loan) {
      return (
        <div className={styles.LoanInfo}>
          <Alert variant="error">{`Could not find a Loan with the id: ${this.props.loanId}`}</Alert>
        </div>
      )
    }

    return (
      <div className={styles.LoanInfo}>
        <Grid>
          <GridRow colSpacing="none" vAlign="middle">
            <GridCol>
              <Heading level="h2">{this.props.loan.name}</Heading>
            </GridCol>

            <GridCol width="auto">
              <Button margin="0 0 0 x-small" onClick={this.handleEdit} size="small" variant="icon">
                <IconEditLine title="Edit Loan" />
              </Button>

              <Button
                margin="0 0 0 x-small"
                onClick={this.handleDelete}
                size="small"
                variant="icon"
              >
                <IconTrashLine title="Delete Loan" />
              </Button>
            </GridCol>
          </GridRow>
        </Grid>

        <TabList
          onChange={this.handleTabChange}
          panelPadding="small 0 0 0"
          selectedIndex={tabNames.indexOf(this.props.tab)}
          variant="minimal"
        >
          <TabPanel title="Summary">
            <Summary loan={this.props.loan} />
          </TabPanel>

          <TabPanel title="Adjustments">
            <AdjustmentsTable loan={this.props.loan} />
          </TabPanel>
        </TabList>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {loanId, query} = state.activity
  const tab = (query && query.tab) || tabNames[0]

  return {
    loan: getLoan(state, loanId),
    loanId,
    tab
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDeleteLoan(loanId) {
      dispatch(deleteLoan(loanId))
    },

    onTabChange(tab) {
      dispatch(replaceQuery({tab}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowLoanInfo)
