import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'

import router from '../router'
import ActivityLink from '../shared/components/ActivityLink'
import {connectConsumer} from '../shared/state/StateProvider'
import ProjectList from './ProjectList'

class ListProjects extends Component {
  componentDidMount() {
    const {projectsAreLoaded, projectsAreLoading} = this.props
    if (!(projectsAreLoaded || projectsAreLoading)) {
      this.props.loadProjects()
    }
  }

  render() {
    return (
      <Container as="div">
        <ActivityLink as={Button} href={router.urls.createProjectUrl()} margin="small 0 0 0" variant="primary">
          Add Project
        </ActivityLink>

        <ProjectList margin="small 0 0 0" projects={this.props.projects} />
      </Container>
    )
  }
}

export default connectConsumer(ListProjects, ({projects}) => {
  return {
    loadProjects: projects.loadProjects,
    projects: projects.getProjectList(),
    projectsAreLoaded: projects.areProjectsLoaded(),
    projectsAreLoading: projects.areProjectsLoading()
  }
})
