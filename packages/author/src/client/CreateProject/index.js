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

class CreateProject extends Component {
  constructor(props) {
    super(props)

    this.formRefs = {}
  }

  componentDidMount() {
    const {projectsAreLoaded, projectsAreLoading} = this.props
    if (!(projectsAreLoaded || projectsAreLoading)) {
      this.props.loadProjects()
    } else if (projectsAreLoaded) {
      this.formRefs.nameInput.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.projectsAreLoaded && this.props.projectsAreLoaded) {
      this.formRefs.nameInput.focus()
    }
  }

  render() {
    const createProject = () => {
      this.props.createProject({name: this.formRefs.nameInput.value})
    }

    if (this.props.projectsAreLoading || !this.props.projectsAreLoaded) {
      return <Spinner title="Loading Projects" />
    }

    return (
      <Container as="div">
        <Heading level="h1">New Project</Heading>

        <Container as="div" margin="small 0">
          <FormFieldGroup colSpacing="medium" description="Project" layout="columns" vAlign="top">
            <TextInput
              defaultValue={this.props.project.name}
              label="Name"
              ref={ref => {
                this.formRefs.nameInput = ref
              }}
            />
          </FormFieldGroup>
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
}

export default connectConsumer(CreateProject, ({projects, routing}) => {
  return {
    loadProjects: projects.loadProjects,
    projectsAreLoaded: projects.areProjectsLoaded(),
    projectsAreLoading: projects.areProjectsLoading(),
    updateProject(attr) {
      projects.updateProject(projectId, attr)
    }
  }
})
