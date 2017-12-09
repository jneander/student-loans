import React from 'react';
import { Provider } from 'react-redux';
import Container from '@instructure/ui-core/lib/components/Container';
import Grid, { GridCol, GridRow } from '@instructure/ui-core/lib/components/Grid';
import Heading from '@instructure/ui-core/lib/components/Heading';
import Select from '@instructure/ui-core/lib/components/Select';
import { Chart } from 'react-google-charts';

import AppHarness from 'js/shared/components/AppHarness';

import Controls from './Controls';
import Visualization from './Visualization';
import * as Actions from './Actions';
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

  componentDidMount () {
    this.store.dispatch(Actions.initialize());
  }

  render () {
    return (
      <AppHarness page="home">
        <Provider store={this.store}>
          <Container as="div" padding="medium">
            <Grid>
              <GridRow>
                <GridCol width="auto">
                  <div style={{ width: '200px' }}>
                    <Controls
                      onProjectionTypeChange={this.onProjectionTypeChange}
                      projectionType={this.state.projectionType}
                    />
                  </div>
                </GridCol>

                <GridCol>
                  <Visualization projectionType={this.state.projectionType} />
                </GridCol>
              </GridRow>
            </Grid>
          </Container>
        </Provider>
      </AppHarness>
    );
  }
}
