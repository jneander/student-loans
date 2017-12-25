import React from 'react';
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-core/lib/components/Table';

import Presenter from './Presenter';

function summarizeAccounts (props) {
  const summary = new Presenter(props.projection, {
    accounts: props.accounts
  });

  return props.accounts.map((account) => {
    const accountSummary = summary.forAccount(account.key);

    return {
      key: account.key,
      name: account.name,
      lastContributionAmount: accountSummary.lastContributionAmount || 0,
      lastContributionDate: accountSummary.lastContributionDate
    };
  });
}

export default class Summary extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      accountSummaries: summarizeAccounts(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      accountSummaries: summarizeAccounts(nextProps)
    });
  }

  render () {
    return (
      <Table
        caption={<ScreenReaderContent>Summary</ScreenReaderContent>}
        size="medium"
      >
        <thead>
          <tr>
            <th scope="col">Key</th>
            <th scope="col">Account</th>
            <th scope="col">Last Contribution</th>
            <th scope="col">Last Contribution Date</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.accountSummaries.map((accountSummary) => (
              <tr key={accountSummary.key}>
                <th scope="row">{ accountSummary.key }</th>
                <td>{ accountSummary.name }</td>
                <td>{ accountSummary.lastContributionAmount.toFixed(2) }</td>
                <td>{ accountSummary.lastContributionDate && accountSummary.lastContributionDate.toString() }</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}
