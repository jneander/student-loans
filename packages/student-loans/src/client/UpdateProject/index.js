import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Spinner from '@instructure/ui-core/lib/components/Spinner'
import TextInput from '@instructure/ui-core/lib/components/TextInput'

import router from '../router'
import ActionBar from '../shared/components/ActionBar'
import {connectConsumer} from '../shared/state/StateProvider'

class ShowProject extends Component {
  componentDidMount() {
    const {projectsAreLoaded, projectsAreLoading} = this.props
    if (!(projectsAreLoaded || projectsAreLoading)) {
      this.props.loadProjects()
    } else if (projectsAreLoaded) {
      this.nameInput.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.projectsAreLoaded && this.props.projectsAreLoaded) {
      this.nameInput.focus()
    }
  }

  render() {
    if (this.props.project) {
      const showProjectUrl = router.urls.showProjectUrl(this.props.project.id)

      return (
        <Container as="div">
          <Heading level="h1">{this.props.project.name}</Heading>

          <Container as="div" margin="small 0">
            <FormFieldGroup colSpacing="medium" description="Project" layout="columns" vAlign="top">
              <TextInput
                defaultValue={this.props.project.name}
                label="Name"
                ref={ref => {
                  this.nameInput = ref
                }}
              />
            </FormFieldGroup>
          </Container>

          <ActionBar
            actions={[{href: showProjectUrl, label: 'Cancel', onClick: this.props.showProject}]}
            margin="small 0 0 0"
          />
        </Container>
      )
    }

    if (this.props.projectsAreLoading || !this.props.projectsAreLoaded) {
      return <Spinner title="Loading Projects" />
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
    loadProjects: projects.loadProjects,
    project,
    projectsAreLoaded: projects.areProjectsLoaded(),
    projectsAreLoading: projects.areProjectsLoading()
  }
})
