import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'

import Activity from './shared/components/Activity'
import StateProvider from './shared/state/StateProvider'
import Layout from './shared/components/Layout'

export default class Client extends Component {
  render() {
    return (
      <StateProvider>
        <Layout>
          <Container as="div" padding="small">
            <Activity name="home">
              <Heading level="h1">Home</Heading>
            </Activity>

            <Activity name="listProjects">
              <Heading level="h1">Projects</Heading>
            </Activity>
          </Container>
        </Layout>
      </StateProvider>
    )
  }
}
