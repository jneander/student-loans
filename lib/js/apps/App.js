import React from 'react';
import { Provider } from 'react-redux';
import { func, shape } from 'prop-types';

import { canvas } from 'instructure-ui/lib/themes';
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';

import Loans from 'js/apps/loans';
import Settings from 'js/apps/settings';

import Header from 'js/shared/components/Header';
import Actions from 'js/apps/loans/Actions';
import Store from 'js/apps/loans/Store';
import Activity from 'js/shared/components/Activity';
import { createRoutingContext } from 'js/shared/routing';
import routingPropTypes from 'js/shared/routing/propTypes';
import RoutingActions from 'js/shared/routing/RoutingActions';

class App extends React.PureComponent {
  static childContextTypes = {
    routing: routingPropTypes.isRequired
  };

  constructor (props) {
    super(props);

    this.store = Store.create();
    this.routing = createRoutingContext(this.store);
  }

  componentWillMount () {
    this.store.dispatch(Actions.initialize());
  }

  getChildContext () {
    return {
      routing: this.routing
    };
  }

  render () {
    return (
      <ApplyTheme theme={canvas}>
        <Provider store={this.store}>
          <div>
            <Header />

            <Activity context="loans">
              <Loans />
            </Activity>

            <Activity context="settings">
              <Settings />
            </Activity>
          </div>
        </Provider>
      </ApplyTheme>
    );
  }
}

export default App;
