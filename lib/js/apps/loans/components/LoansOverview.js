import React from 'react';

import Heading from 'instructure-ui/lib/components/Heading';
import TabList, { TabPanel } from 'instructure-ui/lib/components/TabList';
import Typography from 'instructure-ui/lib/components/Typography';

import styles from 'styles/loan-info.css';
import AdjustmentsTable from 'js/apps/loans/components/AdjustmentsTable';
import LoanTable from 'js/apps/loans/components/LoanTable';

class LoansOverview extends React.Component {
  render () {
    return (
      <div className={styles.LoanInfo}>
        <Heading level="h2">Loans Overview</Heading>

        <TabList variant="minimal" panelPadding="small 0 0 0">
          <TabPanel title="Summary">
            <Typography>Loans Summary Here</Typography>
          </TabPanel>

          <TabPanel title="Loans">
            <LoanTable />
          </TabPanel>

          <TabPanel title="Adjustments">
            <AdjustmentsTable loan={'All Loans'} />
          </TabPanel>
        </TabList>
      </div>
    );
  }
}

export default LoansOverview;
