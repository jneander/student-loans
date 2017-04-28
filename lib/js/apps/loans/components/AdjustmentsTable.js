import React from 'react';

import ScreenreaderContent from 'instructure-ui/lib/components/ScreenreaderContent';
import Table from 'instructure-ui/lib/components/Table';

class AdjustmentsTable extends React.Component {
  render () {
    return (
      <Table striped="rows">
        <caption>
          <ScreenreaderContent>
            { `Adjustments for ${this.props.loan.name}` }
          </ScreenreaderContent>
        </caption>

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
