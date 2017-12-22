import React from 'react';
import { Chart } from 'react-google-charts';

import StateChartModel from '../models/StateChart';

function buildState (props) {
  const model = new StateChartModel(props.projection, {
    accounts: props.accounts,
    endDate: props.endDate,
    startDate: props.startDate
  });
  return model.toTable();
}

export default class StateChart extends React.PureComponent {
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
        chartType="SteppedAreaChart"
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
