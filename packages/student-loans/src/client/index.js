import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'

export default class Client extends Component {
  render() {
    return (
      <Container as="div" padding="small">
        <Heading level="h1">Author</Heading>
      </Container>
    )
  }
}
