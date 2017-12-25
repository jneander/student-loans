import React, { PureComponent } from 'react';

import BudgetInput from './BudgetInput';
import Controls from '../../Controls';

export default class Sidebar extends PureComponent {
  render () {
    return (
      <div style={{ width: '200px' }}>
        <BudgetInput />
      </div>
    );
  }
}
