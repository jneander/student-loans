const styles = require('styles/index.css');

import Button from 'js/button';
import React from 'react';
import ReactDOM from 'react-dom';

import Example from 'js/Example';

import popover from 'images/poop.png';

const $app = document.getElementById('app');

const component = React.createElement(Example, {});
ReactDOM.render(component, $app, null);

if (module.hot) {
  module.hot.accept();
}
