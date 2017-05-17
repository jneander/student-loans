import GoogleApiClient from 'js/wrappers/GoogleApiClient';
import React from 'react';

import DBFile from 'js/apps/loans/db/DBFile';

function createPicker () {
  GoogleApiClient.createFilePicker({
    mimeTypes: DBFile.mimeType,
    onCancel () {
    },
    onSelect (data) {
    }
  });
}

class DriveFilePicker extends React.PureComponent {
  state = { isOpen: false };

  constructor (props) {
    super(props);

    this.open = this.open.bind(this);
  }

  close () {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  open () {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true }, createPicker);
    }
  }

  temporaryUploadExample () {
    GoogleApiClient.createOrUpdateFile();
  }

  render () {
    return null;
  }
}

export default DriveFilePicker;
