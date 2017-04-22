import React from 'react';

import 'instructure-ui/lib/themes/canvas';
// import 'js/theme';

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';
import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Typography from 'instructure-ui/lib/components/Typography';

import LoanList from 'js/components/LoanList';
import Loan from 'js/entities/Loan';

ApplyTheme.setDefaultTheme('canvas');

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loans: [
        new Loan({ id: '101', name: 'Federal Loan #1' }),
        new Loan({ id: '102', name: 'Federal Loan #2' }),
        new Loan({ id: '103', name: 'Private Loan #1' })
      ]
    };
  }

  render () {
    return (
      <Typography tag="div">
        <Container visualDebug>
          <LoanList loans={this.state.loans}/>
          <Button>Foo!</Button>
        </Container>
      </Typography>
    );
  }
}

export default App;
