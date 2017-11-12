import React from 'react';
import { connect } from 'react-redux';
import Container from '@instructure/ui-core/lib/components/Container';
import Heading from '@instructure/ui-core/lib/components/Heading';

import styles from 'styles/loans.css';
import SettingAccessor from 'js/shared/settings/SettingAccessor';
import SettingActions from 'js/shared/settings/SettingActions';

import { bind } from 'js/shared/helpers/ComponentHelper';

class Settings extends React.PureComponent {
  render () {
    return (
      <Container as="div" textAlign="center" padding="medium 0">
        <Container as="div" size="medium" textAlign="start" margin="0 auto">
          <Container as="header">
            <Heading level="h2">Settings</Heading>
          </Container>
        </Container>
      </Container>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
