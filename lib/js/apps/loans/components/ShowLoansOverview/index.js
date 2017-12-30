import React from 'react';

import Heading from '@instructure/ui-core/lib/components/Heading';
import TabList, { TabPanel } from '@instructure/ui-core/lib/components/TabList';
import Text from '@instructure/ui-core/lib/components/Text';

import AdjustmentsTable from 'js/apps/loans/components/AdjustmentsTable';
import LoanTable from 'js/apps/loans/components/LoanTable';

import styles from './styles.css';

class LoansOverview extends React.Component {
  render () {
    return (
      <div className={styles.LoanInfo}>
        <Heading level="h2">Loans Overview</Heading>

        <TabList variant="minimal" panelPadding="small 0 0 0">
          <TabPanel title="Summary">
            <Text>Loans Summary Here</Text>
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
