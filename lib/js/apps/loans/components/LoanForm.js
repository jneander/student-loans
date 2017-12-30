import React from 'react';
import { connect } from 'react-redux';

import Button from '@instructure/ui-core/lib/components/Button';
import Container from '@instructure/ui-core/lib/components/Container';
import Heading from '@instructure/ui-core/lib/components/Heading';
import TextInput from '@instructure/ui-core/lib/components/TextInput';

import LoanActions from 'js/shared/loans/LoanActions';

export default class LoanForm extends React.PureComponent {
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
      this.props.createLoan(this.state.loan);
    };
  }

  render () {
    return (
      <Container as="div">
        <TextInput name="name" label="Name" onChange={this.onInputChange} defaultValue={this.state.loan.name}/>

        <Button onClick={this.submit}>Create</Button>
      </Container>
    );
  }
}
