import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'

import ProjectList from '../shared/projects/components/ProjectList'
import {connectConsumer} from '../shared/state/StateProvider'

class ListProjects extends Component {
  render() {
    const createProject = () => {
      this.props.createProject({name: 'My Project'})
    }

    return (
      <Container as="div">
        <Button onClick={createProject}>Create Project</Button>
        <Button onClick={this.props.loadProjects}>Get Projects</Button>

        <ProjectList projects={this.props.projects} />
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
    projects: projects.getProjectList()
  }
})
