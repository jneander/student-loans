import React from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';

import { listAccounts } from 'js/shared/accounts/AccountAccessor';
import { getProjection } from 'js/shared/plans/PlanAccessor';

function accountToColumn (account) {
  return { label: account.key, type: 'number' };
}

function buildProjectionRows (projection, accounts) {
  if (!projection) {
    return [];
  }

  return projection.timeline().map((dateActivityMap) => (
    [
      dateActivityMap.date,
      ...accounts.map(account => dateActivityMap[account.key] ? dateActivityMap[account.key].balance : null)
    ]
  ));
}

function buildState (props) {
  return {
    columns: [
      { type: 'date' },
      ...props.accounts.map(accountToColumn)
    ],
    rows: buildProjectionRows(props.projection, props.accounts)
  };
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
    accounts: listAccounts(state),
    projection: getProjection(state)
  };
}

export default connect(
  mapStateToProps
)(Visualization);
