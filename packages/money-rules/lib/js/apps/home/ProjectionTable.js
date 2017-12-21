import React from 'react';
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-core/lib/components/Table';
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList';

function ColumnHeader (props) {
  return <th scope="col">{ props.label }</th>
}

function Cell (props) {
  return <td>{ props.cell && props.cell.toFixed(2) }</td>
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

export default class ProjectionTable extends React.PureComponent {
  render () {
    return (
      <Table
        caption={<ScreenReaderContent>Some great records</ScreenReaderContent>}
        size="small"
      >
        <thead>
          <tr>
            { 
              this.props.columns.map((column, index) => (
                <ColumnHeader key={index} column={column} />
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            this.props.rows.map((row, index) => (
              <Row key={index} cells={row} />
            ))
          }
        </tbody>
      </Table>
    );
  }
}
