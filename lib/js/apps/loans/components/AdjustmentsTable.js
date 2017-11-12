import React from 'react';

import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-core/lib/components/Table';

class AdjustmentsTable extends React.Component {
  render () {
    return (
      <Table
        caption={
          <ScreenReaderContent>
            { `Adjustments for ${this.props.loan.name}` }
          </ScreenReaderContent>
        }
        striped="rows"
      >
        <thead>
          <tr>
            <th scope="col">
              Date
            </th>

            <th scope="col">
              Type
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              Jan 1, 2007
            </td>

            <td>
              Loan Created
            </td>
          </tr>

          <tr>
            <td>
              Feb 1, 2007
            </td>

            <td>
              Payment
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default AdjustmentsTable;
