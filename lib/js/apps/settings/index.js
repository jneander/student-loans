import React from 'react';
import { connect } from 'react-redux';
import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/loans.css';
import FilePicker from 'js/apps/settings/components/FilePicker';
import GoogleApiClient from 'js/wrappers/GoogleApiClient';
import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import GoogleDataActions from 'js/shared/google-data/GoogleDataActions';
import SettingAccessor from 'js/shared/settings/SettingAccessor';
import SettingActions from 'js/shared/settings/SettingActions';

import { bind } from 'js/shared/helpers/ComponentHelper';

class Settings extends React.PureComponent {
  constructor (props) {
    super(props);

    bind(this, 'onFileChange');

    this.updateFile = () => {
      if (this.props.selectedFile) {
        const fileId = this.props.selectedFile.id;
        const content = { example: 'update!' };
        this.props.updateFile(fileId, content);
      }
    };
  }

  onFileChange () {
    this.props.reloadSettings();
  }

  render () {
    return (
      <Container as="div" textAlign="center" padding="medium 0">
        <Container as="div" size="medium" textAlign="start" margin="0 auto">
          <Container as="header">
            <Heading level="h2">Settings</Heading>
          </Container>

          <FilePicker
            onFileChange={this.onFileChange}
            selectedFile={this.props.selectedFile}
          />

          <div>
            <Button onClick={this.props.createFile}>Create</Button>
            <Button onClick={this.updateFile}>Update</Button>
          </div>
        </Container>
      </Container>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    files: GoogleDataAccessor.listFiles(state),
    selectedFile: SettingAccessor.getSettings(state).selectedFile
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    reloadSettings () {
      dispatch(SettingActions.loadSettings());
    },

    createFile () {
      dispatch(GoogleDataActions.createFile());
    },

    updateFile (fileId, content) {
      dispatch(GoogleDataActions.updateFile(fileId, content));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
