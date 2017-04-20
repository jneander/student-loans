import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'styles/index.css';
import Example from 'js/Example';

const $app = document.getElementById('app');

function render () {
  ReactDOM.render(
    <AppContainer>
      <Example />
    </AppContainer>,
    $app
  );
}

render();

if (module.hot) {
  module.hot.accept(() => {
    render();
  })
}
