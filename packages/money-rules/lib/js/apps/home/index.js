import React from 'react';
import { Provider } from 'react-redux';
import Container from '@instructure/ui-core/lib/components/Container';
import Grid, { GridCol, GridRow } from '@instructure/ui-core/lib/components/Grid';
import Heading from '@instructure/ui-core/lib/components/Heading';
import Select from '@instructure/ui-core/lib/components/Select';

import AppHarness from 'js/shared/components/AppHarness';

import Sidebar from './views/Sidebar';
import Visualization from './views/Visualization';
import Controls from './Controls';
import EventMachine from './EventMachine';
import * as Actions from './Actions';
import * as Store from './Store';

export default class Home extends React.Component {
  constructor (props) {
    super(props);

    this.store = Store.create();
    this.eventMachine = new EventMachine(this.store);
  }

  componentDidMount () {
    this.eventMachine.start();
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
                  <Sidebar />
                </GridCol>

                <GridCol>
                  <Visualization />
                </GridCol>
              </GridRow>
            </Grid>
          </Container>
        </Provider>
      </AppHarness>
    );
  }
}
