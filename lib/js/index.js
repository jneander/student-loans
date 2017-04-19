const styles = require('styles/index.css');
import Button from 'js/button';

import popover from 'images/poop.png';

const $app = document.getElementById('app');

$app.innerHTML = (`
  <div class="${styles.box}">
    poop
    <img src="${popover}">
  </div>
`);

$app.innerHTML += Button.button;

Button.attachEl();

if (module.hot) {
  module.hot.accept();
}
