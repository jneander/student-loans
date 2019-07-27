import React from 'react';
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-core/lib/components/Table';
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList';

import Day from 'units/Day';

import Presenter from './Presenter';
import styles from './styles.css';

function ColumnHeader (props) {
  return <th scope="col">{ props.label }</th>
}

function Cell (props) {
  return <td><span className={styles[props.column.label]}>{ props.cell }</span></td>
}

function Row (props) {
  const date = props.cells[0].toString();
  return (
    <tr key={date}>
      <th scope="row" key="date">{ date }</th>
      {
        props.cells.slice(1).map((cell, index) => (
          <Cell key={index} cell={cell} column={props.columns[index + 1]} />
        ))
      }
    </tr>
  );
}

function buildState (props) {
  const model = new Presenter(props.projection, {
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
        striped="rows"
      >
        <thead>
          <tr>
            {
              this.state.columns.map((column) => (
                <th key={column.label} scope="col">{ column.label }</th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            this.state.rows.map((row, index) => (
              <Row key={index} cells={row} columns={this.state.columns} />
            ))
          }
        </tbody>
      </Table>
    );
  }
}
