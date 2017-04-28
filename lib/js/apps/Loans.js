import React from 'react';
import { Provider } from 'react-redux';

import 'instructure-ui/lib/themes/canvas';
// import 'js/theme';
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';
ApplyTheme.setDefaultTheme('canvas');

import Header from 'js/shared/components/Header';
import Main from 'js/apps/loans/components/Main';
import Actions from 'js/apps/loans/Actions';
import Store from 'js/apps/loans/Store';

class Loans extends React.Component {
  constructor (props) {
    super(props);

    this.store = Store.create();
  }

  componentWillMount () {
    this.store.dispatch(Actions.initialize());
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          <Header />
          <Main />
        </div>
      </Provider>
    );
  }
}

export default Loans;
