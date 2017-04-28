import React from 'react';

import Heading from 'instructure-ui/lib/components/Heading';
import TabList, { TabPanel } from 'instructure-ui/lib/components/TabList';
import Typography from 'instructure-ui/lib/components/Typography';

import styles from 'styles/loan-info.css';
import AdjustmentsTable from 'js/apps/loans/components/AdjustmentsTable';

class ShowLoanInfo extends React.Component {
  render () {
    return (
      <div className={styles.LoanInfo}>
        <Heading level="h2">{ this.props.loan.name }</Heading>

        <TabList variant="minimal" panelPadding="small 0 0 0">
          <TabPanel title="Summary">
            <Typography>{ this.props.loan.id }</Typography>
          </TabPanel>

          <TabPanel title="Adjustments">
            <AdjustmentsTable loan={this.props.loan} />
          </TabPanel>
        </TabList>
      </div>
    );
  }
}

export default ShowLoanInfo;
