import React from 'react';
import { Provider } from 'react-redux';
import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';
import Select from 'instructure-ui/lib/components/Select';
import { Chart } from 'react-google-charts';

import AppHarness from 'js/shared/components/AppHarness';

import Visualization from './Visualization';
import * as Store from './Store';

export default class Home extends React.Component {
  constructor (props) {
    super(props);

    this.store = Store.create();

    this.state = {
      projectionType: 'totalBalance'
    };

    this.onProjectionTypeChange = (event, arg) => {
      console.log(event, arg);
      this.setState({
        projectionType: event.target.value
      });
    };
  }

  render () {
    return (
      <AppHarness page="home">
        <Provider store={this.store}>
          <div>
            <Container as="div" padding="medium">
              <Visualization projectionType={this.state.projectionType} />
            </Container>

            <Container as="div" padding="medium">
              <Select inline label="Projection Type" onChange={this.onProjectionTypeChange}>
                <option value="totalBalance">Total Balance</option>
              </Select>
            </Container>
          </div>
        </Provider>
      </AppHarness>
    );
  }
}
