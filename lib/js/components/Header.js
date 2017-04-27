import React from 'react';
import { connect } from 'react-redux';

import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/app.css';
import AuthAccessor from 'js/shared/auth/AuthAccessor';
import AuthActions from 'js/shared/auth/AuthActions';

class Header extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Container as="header" className={styles.Header}>
        <Heading level="h1">Student Loans</Heading>

        {
          this.props.authState === 'signedIn' ? (
            <Button variant="primary" onClick={this.props.signOut}>Sign Out</Button>
          ) : (
            <Button
              disabled={this.props.authState === 'signingIn'}
              onClick={this.props.signIn}
              variant="primary"
            >
              Sign In
            </Button>
          )
        }
      </Container>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    authState: AuthAccessor.getAuthState()
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onSignIn () {
      dispatch(AuthActions.signIn());
    },

    onSignOut () {
      dispatch(AuthActions.signOut());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
