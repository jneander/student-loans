import React from 'react';
import { Provider } from 'react-redux';

import 'instructure-ui/lib/themes/canvas';
// import 'js/theme';

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';

import styles from 'styles/app.css';
import Loans from 'js/apps/Loans';
import Actions from 'js/Actions';
import Store from 'js/Store';
import Header from 'js/components/Header';

ApplyTheme.setDefaultTheme('canvas');

class App extends React.Component {
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
          <Loans />
        </div>
      </Provider>
    );
  }
}

export default App;
