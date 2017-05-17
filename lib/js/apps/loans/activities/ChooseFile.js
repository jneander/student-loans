import React from 'react';
import { connect } from 'react-redux';

import Heading from 'instructure-ui/lib/components/Heading';

import GoogleDataAccessor from 'js/shared/google-data/GoogleDataAccessor';
import GoogleDataActions from 'js/shared/google-data/GoogleDataActions';

class ChooseFile extends React.Component {
  componentWillMount () {
    this.props.listFiles();
  }

  render () {
    return (
      <div>
        <Heading level="h2">Choose a File</Heading>

        <ul>
          {
            this.props.files.map(file => (
              <li key={file.id}>{ file.name }</li>
            ))
          }
        </ul>
      </div>
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
)(ChooseFile);
