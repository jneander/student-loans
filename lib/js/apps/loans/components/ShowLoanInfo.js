import React from 'react';
import { connect } from 'react-redux';

import Heading from '@instructure/ui-core/lib/components/Heading';
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList';
import Text from '@instructure/ui-core/lib/components/Text';

import styles from 'styles/loan-info.css';
import AdjustmentsTable from 'js/apps/loans/components/AdjustmentsTable';
import LoanAccessor from 'js/shared/loans/LoanAccessor';
import RoutingActions from 'js/shared/routing/RoutingActions';

const tabNames = ['summary', 'adjustments'];

class ShowLoanInfo extends React.Component {
  constructor (props) {
    super(props);

    this.handleTabChange = (index) => {
      this.props.onTabChange(tabNames[index]);
    };
  }

  render () {
    return (
      <div className={styles.LoanInfo}>
        <Heading level="h2">{ this.props.loan.name }</Heading>

        <TabList
          onChange={this.handleTabChange}
          panelPadding="small 0 0 0"
          selectedIndex={tabNames.indexOf(this.props.tab)}
          variant="minimal"
        >
          <TabPanel title="Summary">
            <Text>{ this.props.loan.id }</Text>
          </TabPanel>

          <TabPanel title="Adjustments">
            <AdjustmentsTable loan={this.props.loan} />
          </TabPanel>
        </TabList>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const { loanId, query } = state.activity;
  const tab = (query && query.tab) || tabNames[0];
  return {
    loan: LoanAccessor.getLoan(state, loanId),
    tab
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onTabChange (tab) {
      dispatch(RoutingActions.replaceQuery({ tab }));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowLoanInfo);
