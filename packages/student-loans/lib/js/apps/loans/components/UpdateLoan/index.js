import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import Alert from '@instructure/ui-core/lib/components/Alert'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'
import TextInput from '@instructure/ui-core/lib/components/TextInput'

import LoanAccessor from 'js/shared/loans/LoanAccessor'
import {updateLoan} from 'js/shared/loans/LoanActions'

import styles from './styles.css'

class UpdateLoan extends PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      loan: props.loan || {}
    };

    this.onInputChange = (event, value) => {
      this.setState({
        loan: {
          ...this.state.loan,
          [event.target.name]: event.target.value
        }
      });
    };

    this.submit = () => {
      this.props.onUpdate(this.state.loan);
    };
  }

  render () {
    if (!this.props.loan) {
      return (
        <div className={styles.ContentContainer}>
          <Alert variant="error">
            {`Could not find a Loan with the id: ${this.props.loanId}`}
          </Alert>
        </div>
      );
    }

    return (
      <div className={styles.LoanInfo}>
        <TextInput name="name" label="Name" onChange={this.onInputChange} defaultValue={this.state.loan.name}/>

        <Button onClick={this.submit}>Update</Button>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  const { loanId, query } = state.activity;

  return {
    loan: LoanAccessor.getLoan(state, loanId),
    loanId
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onUpdate (loan) {
      dispatch(updateLoan(loan));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLoan);
