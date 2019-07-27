import React from 'react';
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-core/lib/components/Table';

import Presenter from './Presenter';
import styles from './styles.css';

function summarizeAccounts (props) {
  const summary = new Presenter(props.projection, {
    accounts: props.accounts
  });

  return props.accounts.map((account) => {
    const accountSummary = summary.forAccount(account.key);

    return {
      key: account.key,
      name: account.name,
      totalContribution: accountSummary.totalContribution,
      lastContributionAmount: accountSummary.lastContributionAmount || 0,
      lastContributionDate: accountSummary.lastContributionDate
    };
  });
}

function getOverallSummary (props) {
  const summary = new Presenter(props.projection, {
    accounts: props.accounts
  });

  return summary.overallSummary;
}

export default class Summary extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      accountSummaries: summarizeAccounts(props),
      overallSummary: getOverallSummary(props)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      accountSummaries: summarizeAccounts(nextProps),
      overallSummary: getOverallSummary(nextProps)
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
            <th scope="col">Total Contribution</th>
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
                <td><span className={styles.Currency}>{ accountSummary.totalContribution.toFixed(2) }</span></td>
                <td><span className={styles.Currency}>{ accountSummary.lastContributionAmount.toFixed(2) }</span></td>
                <td>{ accountSummary.lastContributionDate && accountSummary.lastContributionDate.toString() }</td>
              </tr>
            ))
          }

          <tr key="total">
            <th scope="row">Total</th>
            <td></td>
            <td><span className={styles.Currency}>{ this.state.overallSummary.totalContribution.toFixed(2) }</span></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
