import React from 'react';

import Link from 'instructure-ui/lib/components/Link';
import ScreenreaderContent from 'instructure-ui/lib/components/ScreenreaderContent';
import Table from 'instructure-ui/lib/components/Table';

class LoanTable extends React.Component {
  render () {
    return (
      <Table striped="rows">
        <caption>
          <ScreenreaderContent>All Loans</ScreenreaderContent>
        </caption>

        <thead>
          <tr>
            <th scope="col">
              Name
            </th>

            <th scope="col">
              Origination Date
            </th>

            <th scope="col">
              Current Principal
            </th>

            <th scope="col">
              Current Interest
            </th>

            <th scope="col">
              Original Principal
            </th>

            <th scope="col">
              Interest Rate
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Link>Federal Loan #1</Link>
            </td>

            <td>
              Jan 1, 2007
            </td>

            <td>
              $ 8,500
            </td>

            <td>
              $ 123
            </td>

            <td>
              $ 8,500
            </td>

            <td>
              6.800 %
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default LoanTable;
