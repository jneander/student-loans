import React from 'react';
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-core/lib/components/Table';
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList';

import Day from 'units/Day';

import EventTableModel from '../models/EventTable';

function ColumnHeader (props) {
  return <th scope="col">{ props.label }</th>
}

function Cell (props) {
  return <td>{ props.cell }</td>
}

function Row (props) {
  const date = props.cells[0].toString();
  return (
    <tr key={date}>
      <th scope="row" key="date">{ date }</th>
      {
        props.cells.slice(1).map((cell, index) => (
          <Cell key={index} cell={cell} />
        ))
      }
    </tr>
  );
}

function buildState (props) {
  const model = new EventTableModel(props.projection, {
    accounts: props.accounts,
    endDate: props.endDate,
    startDate: props.startDate
  });
  return model.toTable();
}

export default class EventTable extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = buildState(props);
  }

  componentWillReceiveProps (nextProps) {
    this.setState(buildState(nextProps));
  }

  render () {
    return (
      <Table
        caption={<ScreenReaderContent>Events</ScreenReaderContent>}
        size="small"
      >
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Balance</th>
            <th scope="col">Account</th>
            <th scope="col">Type</th>
            <th scope="col">Total</th>
            <th scope="col">Principal</th>
            <th scope="col">Interest</th>
            <th scope="col">Other</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.rows.map((row, index) => (
              <Row key={index} cells={row} />
            ))
          }
        </tbody>
      </Table>
    );
  }
}
