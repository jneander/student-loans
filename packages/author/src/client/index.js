import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Button from '@instructure/ui-core/lib/components/Button'
import Heading from '@instructure/ui-core/lib/components/Heading'

import Activity from './shared/components/Activity'
import AuthConsumer from './shared/state/AuthConsumer'
import StateProvider from './shared/state/StateProvider'
import Layout from './shared/components/Layout'
import CreateProject from './CreateProject'
import ListProjects from './ListProjects'
import ShowProject from './ShowProject'
import UpdateProject from './UpdateProject'

export default class Client extends Component {
  render() {
    return (
      <StateProvider>
        <Layout>
          <AuthConsumer>
            {auth => {
              if (auth.isSigningIn()) {
                return (
                  <Container as="div" padding="small">
                    <span>Authorizing</span>
                  </Container>
                )
              }

              if (auth.isSignedIn()) {
                return (
                  <Container as="div" padding="small">
                    <Activity name="home">
                      <Heading level="h1">Home</Heading>
                    </Activity>

                    <Activity name="listProjects">
                      <Heading level="h1">Projects</Heading>

                      <ListProjects />
                    </Activity>

                    <Activity name="showProject">
                      <ShowProject />
                    </Activity>

                    <Activity name="createProject">
                      <CreateProject />
                    </Activity>

                    <Activity name="updateProject">
                      <UpdateProject />
                    </Activity>

                    <Activity name="showSettings">
                      <Heading level="h1">Settings</Heading>
                    </Activity>
                  </Container>
                )
              }

              return (
                <Container as="div" padding="small">
                  <Button onClick={auth.signIn} variant="primary">
                    Sign in with Google
                  </Button>
                </Container>
              )
            }}
          </AuthConsumer>
        </Layout>
      </StateProvider>
    )
  }
}
