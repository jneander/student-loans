import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Grid, {GridCol, GridRow} from '@instructure/ui-core/lib/components/Grid'
import Heading from '@instructure/ui-core/lib/components/Heading'

import {urls} from '../../../router'
import {getAuthState, SIGNED_IN, SIGNING_IN} from '../../auth/AuthAccessor'
import {signIn, signOut} from '../../auth/AuthActions'
import ActivityLink from '../../../../shared/components/ActivityLink'
import styles from './styles.css'

class Header extends PureComponent {
  render() {
    return (
      <Container as="header" className={styles.Header}>
        <Grid vAlign="middle" colSpacing="none">
          <GridRow>
            <GridCol>
              <Heading level="h1">
                <ActivityLink as="link" href={urls.listLoansUrl()}>
                  Student Loans
                </ActivityLink>
              </Heading>
            </GridCol>

            {this.props.authState === SIGNED_IN && (
              <GridCol width="auto">
                <ActivityLink as="link" href={urls.showSettingsUrl()} margin="0 medium 0 0">
                  Settings
                </ActivityLink>
              </GridCol>
            )}

            <GridCol width="auto">
              {this.props.authState === SIGNED_IN ? (
                <Button variant="primary" onClick={this.props.onSignOut}>
                  Sign Out
                </Button>
              ) : (
                <Button
                  disabled={this.props.authState === SIGNING_IN}
                  onClick={this.props.onSignIn}
                  variant="primary"
                >
                  Sign In
                </Button>
              )}
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authState: getAuthState(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSignIn() {
      dispatch(signIn())
    },

    onSignOut() {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
