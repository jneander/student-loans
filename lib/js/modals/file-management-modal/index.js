import React from 'react';
import { connect } from 'react-redux';
import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'instructure-ui/lib/components/Modal';
import Spinner from 'instructure-ui/lib/components/Spinner';

import Accessor from 'js/modals/file-management-modal/Accessor';
import Actions from 'js/modals/file-management-modal/Actions';
import Store from 'js/modals/file-management-modal/Store';
import FileList from 'js/modals/file-management-modal/components/FileList';

import SettingAccessor from 'js/shared/settings/SettingAccessor';
import SettingActions from 'js/shared/settings/SettingActions';
import When from 'js/shared/components/When';
import { bind } from 'js/shared/helpers/ComponentHelper';
import ModalHelper from 'js/shared/helpers/ModalHelper';

class FileManagementModal extends React.Component {
  constructor (props) {
    super(props);

    bind(this, 'listFiles', 'onFileChange', 'save');

    this.state = {
      selectedFile: props.selectedFile
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({ selectedFile: nextProps.selectedFile });
      this.props.initialize();
    }

    if (nextProps.saveSettingsStatus === 'success' && this.props.saveSettingsStatus !== 'success') {
      // if a different file was selected, call the onFileChange prop
      if (this.state.selectedFile.id !== this.props.selectedFile.id) {
        this.props.onFileChange(this.state.selectedFile);
      }
      this.props.onClose();
    }
  }

  listFiles () {
    this.props.listFiles();
  }

  onFileChange (file) {
    this.setState({
      selectedFile: file,
      unsavedChanges: file.id !== (this.props.selectedFile || {}).id
    });
  }

  save () {
    this.props.onSave({
      selectedFile: this.state.selectedFile
    });
  }

  render () {
    const canSave = this.props.listFilesStatus !== 'success';

    return (
      <Modal
        isOpen={this.props.isOpen}
        label="Student Loans Files"
        onClose={this.props.onExit}
        onRequestClose={this.props.onClose}
        size="small"
      >
        <ModalHeader>
          <Heading>Student Loans Files</Heading>
        </ModalHeader>

        <ModalBody>
          <When case={this.props.listFilesStatus === 'started'}>
            <Container as="div" textAlign="center">
              <Spinner title="Loading Files" margin="medium auto"/>
            </Container>
          </When>

          <When case={this.props.listFilesStatus === 'success'}>
            <FileList
              files={this.props.files}
              onFileChange={this.onFileChange}
              selectedFileId={(this.state.selectedFile || {}).id}
            />
          </When>
        </ModalBody>

        <ModalFooter>
          <Button onClick={this.props.onClose} margin="0 small 0 0">
            Cancel
          </Button>

          <Button onClick={this.save} variant="primary" disabled={canSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    files: Accessor.listFiles(state),
    listFilesStatus: Accessor.getListFilesStatus(state),
    saveSettingsStatus: SettingAccessor.getSaveSettingsStatus(state)
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    initialize () {
      dispatch(Actions.initialize());
    },

    listFiles () {
      dispatch(Actions.listFiles());
    },

    onSave (settings) {
      dispatch(SettingActions.saveSettings(settings));
    }
  };
}

const ConnectedModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManagementModal);

ConnectedModal.displayName = 'FileManagementModal';

export default ModalHelper.createReduxModalClass(ConnectedModal, Store.create);
