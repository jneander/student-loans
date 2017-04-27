import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'normalize.css';
import 'styles/index.css';
import GoogleClient from 'js/api/GoogleClient';
import SignIn from 'js/apps/SignIn';

const $app = document.getElementById('app');

function render () {
  ReactDOM.render(
    <AppContainer>
      <SignIn />
    </AppContainer>,
    $app
  );
}

render();

if (module.hot) {
  module.hot.accept(render);
}
