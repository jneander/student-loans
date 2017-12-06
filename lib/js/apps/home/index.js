import React from 'react';
import { Provider } from 'react-redux';
import Container from 'instructure-ui/lib/components/Container';
import Grid, { GridCol, GridRow } from 'instructure-ui/lib/components/Grid';
import Heading from 'instructure-ui/lib/components/Heading';
import Select from 'instructure-ui/lib/components/Select';
import { Chart } from 'react-google-charts';

import AppHarness from 'js/shared/components/AppHarness';

import Controls from './Controls';
import Visualization from './Visualization';
import * as Store from './Store';

export default class Home extends React.Component {
  constructor (props) {
    super(props);

    this.store = Store.create();

    this.state = {
      projectionType: 'totalBalance'
    };

    this.onProjectionTypeChange = (projectionType) => {
      this.setState({ projectionType });
    };
  }

  render () {
    return (
      <AppHarness page="home">
        <Provider store={this.store}>
          <Grid>
            <GridRow>
              <GridCol>
                <Container as="div" padding="medium">
                  <Controls
                    onProjectionTypeChange={this.onProjectionTypeChange}
                    projectionType={this.state.projectionType}
                  />
                </Container>
              </GridCol>

              <GridCol>
                <Container as="div" padding="medium">
                  <Visualization projectionType={this.state.projectionType} />
                </Container>
              </GridCol>
            </GridRow>
          </Grid>
        </Provider>
      </AppHarness>
    );
  }
}
