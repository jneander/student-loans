import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'

import {connectConsumer} from '../shared/state/StateProvider'

class ShowProject extends Component {
  render() {
    if (this.props.project) {
      return (
        <Container as="div">
          <Heading level="h1">{this.props.project.name}</Heading>

          <Button onClick={this.props.deleteProject} variant="danger">
            Delete
          </Button>
        </Container>
      )
    }

    return (
      <Container as="div">
        <Heading level="h1">Not Found</Heading>
      </Container>
    )
  }
}

export default connectConsumer(ShowProject, ({projects, routing}) => {
  const {projectId} = routing.getActivity()
  const project = projects.getProject(projectId)

  return {
    deleteProject: () => {
      projects.deleteProject(projectId)
    },
    project
  }
})
