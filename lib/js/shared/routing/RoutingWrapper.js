import React from 'react';
import { Provider } from 'react-redux';
import { func, shape } from 'prop-types';

import { canvas } from 'instructure-ui/lib/themes';
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';

import { createRoutingContext } from 'js/shared/routing';
import routingPropTypes from 'js/shared/routing/propTypes';
import RoutingActions from 'js/shared/routing/RoutingActions';

// TODO:
// props: {
//   router
//   store? (gets it from provider?)
// }

class Loans extends React.PureComponent {
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
    return this.props.children;
  }
}

export default Loans;
