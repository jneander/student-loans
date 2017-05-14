import React from 'react';
import { connect } from 'react-redux';

function Activity (props) {
  if ('name' in props) {
    if (props.name === props.currentActivity.name) {
      return props.children;
    }
  }

  if ('names' in props) {
    if (props.names.includes(props.currentActivity.name)) {
      return props.children;
    }
  }

  return null;
}

function mapStateToProps (state, ownProps) {
  return {
    currentActivity: state.activity
  };
}

export default connect(
  mapStateToProps
)(Activity);
