import React from 'react';
import { connect } from 'react-redux';
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList';

import { getAccountList } from 'js/shared/accounts/AccountAccessor';
import { getProjection } from 'js/shared/plans/PlanAccessor';

import { getProjectionType, getSelectedEndDate, getSelectedStartDate } from '../../app-state/AppStateAccessor';
import EventTable from '../EventTable';
import StateChart from '../StateChart';
import Summary from '../Summary';

import styles from './styles.css';

class Visualization extends React.PureComponent {
  render () {
    if (!this.props.projection) {
      return <div></div>;
    }

    return (
      <div className={styles.TabList}>
        <TabList defaultSelectedIndex={2}>
          <TabPanel title="Summary">
            <Summary
              accounts={this.props.accounts}
              projection={this.props.projection}
            />
          </TabPanel>

          <TabPanel title="Events">
            <EventTable
              accounts={this.props.accounts}
              endDate={this.props.selectedEndDate}
              projection={this.props.projection}
              startDate={this.props.selectedStartDate}
            />
          </TabPanel>

          <TabPanel title="Chart">
            <StateChart
              accounts={this.props.accounts}
              endDate={this.props.selectedEndDate}
              projection={this.props.projection}
              startDate={this.props.selectedStartDate}
            />
          </TabPanel>
        </TabList>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    accounts: getAccountList(state),
    projection: getProjection(state),
    projectionType: getProjectionType(state),
    selectedEndDate: getSelectedEndDate(state),
    selectedStartDate: getSelectedStartDate(state)
  };
}

export default connect(
  mapStateToProps
)(Visualization);
