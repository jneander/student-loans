import { createStore } from 'redux';

import reducer from './reducer';

export function create () {
  return createStore(reducer);
}
