import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Spinner from '@instructure/ui-core/lib/components/Spinner'
import TextInput from '@instructure/ui-core/lib/components/TextInput'

import router from '../router'
import ActionBar from '../shared/components/ActionBar'
import ProjectForm from '../shared/components/ProjectForm'
import {connectConsumer} from '../shared/state/StateProvider'

class UpdateProject extends Component {
  componentDidMount() {
    const {projectsAreLoaded, projectsAreLoading} = this.props
    if (!(projectsAreLoaded || projectsAreLoading)) {
      this.props.loadProjects()
    }
  }

  render() {
    if (this.props.projectsAreLoading || !this.props.projectsAreLoaded) {
      return <Spinner title="Loading Projects" />
    }

    if (this.props.project) {
      const showProjectUrl = router.urls.showProjectUrl(this.props.project.id)
      const updateProject = () => {
        this.props.updateProject(this.form.formData)
      }

      return (
        <Container as="div">
          <Heading level="h1">{this.props.project.name}</Heading>

          <Container as="div" margin="small 0">
            <ProjectForm ref={ref => {this.form = ref}} project={this.props.project} />
          </Container>

          <ActionBar
            actions={[
              {label: 'Update', onClick: updateProject, variant: 'primary'},
              {href: showProjectUrl, label: 'Cancel', onClick: this.props.showProject}
            ]}
            margin="small 0 0 0"
          />
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

export default connectConsumer(UpdateProject, ({projects, routing}) => {
  const {projectId} = routing.getActivity()
  const project = projects.getProject(projectId)

  return {
    loadProjects: projects.loadProjects,
    project,
    projectsAreLoaded: projects.areProjectsLoaded(),
    projectsAreLoading: projects.areProjectsLoading(),
    updateProject(attr) {
      projects.updateProject(projectId, attr)
    }
  }
})
