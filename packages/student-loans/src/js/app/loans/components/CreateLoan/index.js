import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import DateInput from '@instructure/ui-core/lib/components/DateInput'
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup'
import Heading from '@instructure/ui-core/lib/components/Heading'
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent'
import TextInput from '@instructure/ui-core/lib/components/TextInput'

import {createLoan} from '../../../../shared/loans/LoanActions'
import styles from './styles.css'

function validateName(loan) {
  if (!loan.name) {
    return [{type: 'error', text: 'Name is required'}]
  }
}

function validate(loan, visits) {
  return {
    name: visits.name ? validateName(loan) : null
  }
}

class CreateLoan extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      inputVisits: {},
      loan: props.loan || {},
      validations: {}
    }

    this.onInputChange = (event, value) => {
      const loan = {
        ...this.state.loan,
        [event.target.name]: event.target.value
      }

      this.setState({
        loan,
        validations: validate(loan, this.state.inputVisits)
      })
    }

    this.onInputBlur = event => {
      const state = {
        ...this.state,
        inputVisits: {
          ...this.state.inputVisits,
          [event.target.name]: true
        }
      }

      this.setState({
        ...state,
        validations: validate(state.loan, state.inputVisits)
      })
    }

    this.submit = () => {
      this.props.onCreate(this.state.loan)
    }
  }

  render() {
    return (
      <div className={styles.ContentContainer}>
        <FormFieldGroup
          layout="columns"
          description="Loan"
          vAlign="top"
          colSpacing="medium"
          rowSpacing="medium"
        >
          <FormFieldGroup layout="stacked" description="Original Loan Details" vAlign="top">
            <TextInput
              defaultValue={this.state.loan.name}
              label="Name"
              messages={this.state.validations.name}
              name="name"
              onBlur={this.onInputBlur}
              onChange={this.onInputChange}
              required
            />

            <TextInput label="Servicer" />

            <DateInput
              label="Origination Date"
              margin="medium 0 medium 0"
              name="originationDate"
              nextLabel="Next Month"
              previousLabel="Previous Month"
            />

            <TextInput label="Original Principal" name="originalPrincipal" />
          </FormFieldGroup>

          <FormFieldGroup layout="stacked" description="Current Loan Details" vAlign="top">
            <TextInput label="APR" />

            <TextInput label="Minimum Payment" />
          </FormFieldGroup>
        </FormFieldGroup>

        <Container as="div" textAlign="end" margin="large 0 0 0">
          <Button margin="0 small 0 0">Cancel</Button>

          <Button onClick={this.submit} variant="primary">
            Create
          </Button>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onCreate(loan) {
      dispatch(createLoan(loan))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLoan)
