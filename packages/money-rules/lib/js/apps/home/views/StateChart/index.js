import React from 'react';
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Checkbox from '@instructure/ui-core/lib/components/Checkbox';
import Container from '@instructure/ui-core/lib/components/Container';

import Day from 'units/Day';

import Presenter from './Presenter';

function formatAmount (value) {
  return value.toFixed(2);
}

function formatDate (date, what) {
  return new Day(date).toString();
}

function getDateFromRow (row) {
  return row.date;
}

function buildState (props) {
  const model = new Presenter(props.projection, {
    accounts: props.accounts,
    endDate: props.endDate,
    startDate: props.startDate
  });
  return {
    dataSpecs: model.dataSpecs,
    rows: model.rows
  }; }

const COLORS = [
  { fill: '#FF9C9C', stroke: '#FF5757' },
  { fill: '#B4DDE0', stroke: '#81C3C9' },
  { fill: '#C9B5E8', stroke: '#958FDB' },
  { fill: '#B4E0B4', stroke: '#81C981' },
  { fill: '#B4C6E0', stroke: '#819FC9' },
  { fill: '#F7F7A3', stroke: '#F5F536' },
  { fill: '#E8B5CF', stroke: '#DB8FC2' },
  { fill: '#FFCD9C', stroke: '#FFAB57' }
];

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
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={this.state.rows} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey={getDateFromRow} tickCount={10} tickFormatter={formatDate} />
            <YAxis />

            <CartesianGrid strokeDasharray="3 3" />

            <Tooltip formatter={formatAmount} />

            {
              this.state.dataSpecs.map((dataSpec, index) => (
                <Area
                  key={dataSpec.key}
                  dataKey={dataSpec.key}
                  stackId="1"
                  type="stepAfter"
                  {...COLORS[(index + COLORS.length) % COLORS.length]}
                />
              ))
            }
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
