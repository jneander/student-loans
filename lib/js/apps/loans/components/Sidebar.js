import React from 'react';
import Button from 'instructure-ui/lib/components/Button';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/loans.css';
import Urls from 'js/apps/loans/Urls';
import LoanList from 'js/apps/loans/components/LoanList';
import ActivityLink from 'js/shared/components/ActivityLink';
import DriveFilePicker from 'js/apps/loans/components/DriveFilePicker';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);

    this.openFilePicker = this.openFilePicker.bind(this);
    this.upload = this.upload.bind(this);
  }

  openFilePicker () {
    this.filePicker.open();
  }

  upload () {
    this.filePicker.temporaryUploadExample();
  }

  render () {
    return (
      <aside id="sidebar" role="complementary" className={styles.Sidebar}>
        <Heading level="h2">Loans</Heading>

        <LoanList loans={this.props.loans} />

        <ActivityLink as="button" href={Urls.newLoanUrl()} variant="primary">
          Add a Loan…
        </ActivityLink>

        <ActivityLink href={Urls.chooseFileUrl()}>
          Choose a File…
        </ActivityLink>

        <DriveFilePicker ref={(ref) => { this.filePicker = ref }} />
        <Button onClick={this.openFilePicker}>Open File Picker</Button>
        <Button variant="primary" onClick={this.upload}>Upload</Button>
      </aside>
    );
  }
}

export default Sidebar;
