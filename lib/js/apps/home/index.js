import React from 'react';
import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';
import { Chart } from 'react-google-charts';

import data from './data';

import AppHarness from 'js/shared/components/AppHarness';

export default class Home extends React.Component {
  render () {
    return (
      <AppHarness page="home">
        <Container as="div" padding="medium">
          <Chart
            chartType="AreaChart"
            columns={[
              { label: 'Date', type: 'date' },
              { label: 'Balance', type: 'number' }
            ]}
            rows={data}
            options={{
              hAxis: { title: 'Date' },
              vAxis: { format: 'currency', title: 'Balance' }
            }}
            graph_id="ScatterChart"
            width="100%"
            height="400px"
            legend_toggle
          />
        </Container>
      </AppHarness>
    );
  }
}
