import React from 'react';
import { connect } from 'react-redux';

import Button from '@instructure/ui-core/lib/components/Button';
import Container from '@instructure/ui-core/lib/components/Container';
import Grid, { GridCol, GridRow } from '@instructure/ui-core/lib/components/Grid';
import Heading from '@instructure/ui-core/lib/components/Heading';

import styles from 'styles/shared.css';
import { urls } from 'js/apps/loans/Router';
import ActivityLink from 'js/shared/components/ActivityLink';
import AuthAccessor from 'js/shared/auth/AuthAccessor';
import AuthActions from 'js/shared/auth/AuthActions';

class Header extends React.PureComponent {
  render () {
    return (
      <Container as="header" className={styles.Header}>
        <Grid vAlign="middle" colSpacing="none">
          <GridRow>
            <GridCol>
              <Heading level="h1">
                <ActivityLink as="link" href={urls.listLoansUrl()}>Student Loans</ActivityLink>
              </Heading>
            </GridCol>

            {
              this.props.authState === 'signedIn' && (
                <GridCol width="auto">
                  <ActivityLink as="link" href={urls.showSettingsUrl()} margin="0 medium 0 0">Settings</ActivityLink>
                </GridCol>
              )
            }

            <GridCol width="auto">
              {
                this.props.authState === 'signedIn' ? (
                  <Button variant="primary" onClick={this.props.onSignOut}>Sign Out</Button>
                ) : (
                  <Button
                    disabled={this.props.authState === 'signingIn'}
                    onClick={this.props.onSignIn}
                    variant="primary"
                  >
                    Sign In
                  </Button>
                )
              }
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    authState: AuthAccessor.getAuthState(state)
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
