import React from 'react';
import { connect } from 'react-redux';
import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import Typography from 'instructure-ui/lib/components/Typography';

import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import GoogleDataActions from 'js/shared/google-data/GoogleDataActions';

import FileManagementModal from 'js/modals/file-management-modal';

class FilePicker extends React.Component {
  state = {
    showFiles: false
  };

  constructor (props) {
    super(props);

    this.listFiles = () => {
      this.props.listFiles();
      this.setState({ showFiles: true });
    };

    this.bindFileManagementModal = (ref) => {
      this.fileManagementModal = ref;
    };

    this.bindOpenFileManagementModalButton = (ref) => {
      this.openFileManagementModalButton = ref;
    };

    this.openFileManagementModal = () => {
      this.fileManagementModal.open();
    };

    this.focusOnOpenFileManagementModalButton = () => {
      this.openFileManagementModalButton.focus();
    };
  }

  render () {
    return (
      <Container as="div" padding="small">
        <Grid vAlign="middle" padding="small">
          <GridRow>
            <GridCol>
              {
                this.props.selectedFile ? (
                  <Typography>
                    <b>Current file:</b>
                    &nbsp;
                    { this.props.selectedFile.name }
                  </Typography>
                ) : (
                  <Typography>
                    No file selected
                  </Typography>
                )
              }
            </GridCol>

            <GridCol width="auto">
              <Button ref={this.bindOpenFileManagementModalButton} onClick={this.openFileManagementModal}>
                { this.props.selectedFile ? 'Change' : 'Select' }
              </Button>
            </GridCol>
          </GridRow>
        </Grid>

        <FileManagementModal
          ref={this.bindFileManagementModal}
          onExit={this.focusOnOpenFileManagementModalButton}
          onFileChange={this.props.onFileChange}
          selectedFile={this.props.selectedFile}
        />
      </Container>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    files: GoogleDataAccessor.listFiles(state)
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    listFiles () {
      dispatch(GoogleDataActions.listFiles());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilePicker);
