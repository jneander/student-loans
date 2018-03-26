import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Spinner from '@instructure/ui-core/lib/components/Spinner'

import router from '../router'
import ActionBar from '../shared/components/ActionBar'
import {connectConsumer} from '../shared/state/StateProvider'

class ShowProject extends Component {
  componentDidMount() {
    const {projectsAreLoaded, projectsAreLoading} = this.props
    if (!(projectsAreLoaded || projectsAreLoading)) {
      this.props.loadProjects()
    } else if (projectsAreLoaded) {
      this.updateButton.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.projectsAreLoaded && this.props.projectsAreLoaded) {
      this.updateButton.focus()
    }
  }

  render() {
    if (this.props.project) {
      const updateProjectUrl = router.urls.updateProjectUrl(this.props.project.id)

      const updateAction = {
        href: updateProjectUrl,
        label: 'Update',
        onClick: this.props.editProject,
        buttonRef: ref => {
          this.updateButton = ref
        },
        variant: 'primary'
      }

      return (
        <Container as="div">
          <Heading level="h1">{this.props.project.name}</Heading>

          <ActionBar
            actions={[
              updateAction,
              {label: 'Delete', onClick: this.props.deleteProject, variant: 'danger'}
            ]}
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
    deleteProject() {
      projects.deleteProject(projectId)
    },
    loadProjects: projects.loadProjects,
    project,
    projectsAreLoaded: projects.areProjectsLoaded(),
    projectsAreLoading: projects.areProjectsLoading(),
    updateProject(attr) {
      projects.updateProject(projectId, attr)
    }
  }
})
