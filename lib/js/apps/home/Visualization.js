import React from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';

import { getAccountList } from 'js/shared/accounts/AccountAccessor';
import { getProjection } from 'js/shared/plans/PlanAccessor';

import { getProjectionType, getSelectedEndDate, getSelectedStartDate } from './app-state/AppStateAccessor';
import VisualizationModel from './models/Visualization';

function buildState (props) {
  if (props.projection) {
    const visualization = new VisualizationModel(props.projection, {
      accounts: props.accounts,
      endDate: props.selectedEndDate,
      startDate: props.selectedStartDate
    });
    return visualization.toTable();
  }
  return { rows: null, columns: null };
}

class Visualization extends React.Component {
  constructor (props) {
    super(props);

    this.state = buildState(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(buildState(nextProps));
  }

  render () {
    if (!this.props.projection) {
      return <div></div>;
    }

    return (
      <Chart
        chartType="AreaChart"
        columns={this.state.columns}
        rows={this.state.rows}
        options={{
          hAxis: { title: 'Date' },
          isStacked: true,
          vAxis: { format: 'currency', title: 'Balance' }
        }}
        graph_id="AreaChart"
        width="100%"
        height="400px"
        legend_toggle
      />
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
