import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'styles/index.css';
import App from 'js/App';

const $app = document.getElementById('app');

function render () {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    $app
  );
}

render();

if (module.hot) {
  module.hot.accept(render);
}
