import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup'
import TextInput from '@instructure/ui-core/lib/components/TextInput'

export default class ProjectForm extends Component {
  constructor(props) {
    super(props)

    this.formRefs = {}
  }

  componentDidMount() {
    this.formRefs.nameInput.focus()
  }

  get formData() {
    return {
      name: this.formRefs.nameInput.value
    }
  }

  render() {
    return (
      <FormFieldGroup colSpacing="medium" description="Project" layout="columns" vAlign="top">
        <TextInput
          defaultValue={this.props.project.name}
          label="Name"
          ref={ref => {
            this.formRefs.nameInput = ref
          }}
        />
      </FormFieldGroup>
    )
  }
}
