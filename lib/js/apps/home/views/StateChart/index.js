import React from 'react';
import { Chart } from 'react-google-charts';
import Checkbox from '@instructure/ui-core/lib/components/Checkbox';
import Container from '@instructure/ui-core/lib/components/Container';

import StateChartModel from '../../models/StateChart';

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

    this.onShowOverallChange = (event) => {
      this.setState({
        showOverall: event.target.checked
      });
    };

    this.state = {
      showOverall: true,
      ...buildState(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState(buildState(nextProps));
  }

  render () {
    return (
      <div>
        <Container as="div" margin="0 0 medium 0">
          <Checkbox label="Overall" checked={this.state.showOverall} onChange={this.onShowOverallChange} />
        </Container>

        <Chart
          chartType={this.state.showOverall ? 'SteppedAreaChart' : 'LineChart'}
          columns={this.state.columns}
          rows={this.state.rows}
          options={{
            hAxis: { title: 'Date' },
            isStacked: this.state.showOverall,
            vAxis: { format: 'currency', title: 'Balance' }
          }}
          graph_id="AreaChart"
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
    );
  }
}
