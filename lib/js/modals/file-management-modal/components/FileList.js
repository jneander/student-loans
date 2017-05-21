import React from 'react';
import { connect } from 'react-redux';
import RadioInput from 'instructure-ui/lib/components/RadioInput';
import RadioInputGroup from 'instructure-ui/lib/components/RadioInputGroup';

import { bind } from 'js/shared/helpers/ComponentHelper';

class FileList extends React.PureComponent {
  constructor (props) {
    super(props);

    bind(this, 'onChange');
  }

  onChange (fileId) {
    this.props.onFileChange(this.props.files.find(file => file.id === fileId));
  }

  render () {
    return (
      <RadioInputGroup
        description="Choose a file"
        name="fileList"
        onChange={this.onChange}
        value={this.props.selectedFileId}
      >
        { this.props.files.map(file => <RadioInput key={file.id} value={file.id} label={file.name} />) }
      </RadioInputGroup>
    );
  }
}

export default FileList;
