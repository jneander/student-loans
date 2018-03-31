import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'

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
    const createProject = () => {
      this.props.createProject({name: 'My Project'})
    }

    return (
      <Container as="div">
        <Button margin="small 0 0 0" onClick={createProject} variant="primary">
          Add Project
        </Button>

        <ProjectList margin="small 0 0 0" projects={this.props.projects} />
      </Container>
    )
  }
}

export default connectConsumer(ListProjects, ({projects}) => {
  return {
    createProject: attr => {
      projects.createProject(attr)
    },
    loadProjects: projects.loadProjects,
    projects: projects.getProjectList(),
    projectsAreLoaded: projects.areProjectsLoaded(),
    projectsAreLoading: projects.areProjectsLoading()
  }
})
