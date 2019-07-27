import React, { PureComponent } from 'react';
import Container from '@instructure/ui-core/lib/components/Container';

import BudgetInput from './BudgetInput';
import DebtStrategySelect from './DebtStrategySelect';

export default class Sidebar extends PureComponent {
  render () {
    return (
      <div style={{ width: '200px' }}>
        <Container as="div" margin="0 0 small 0">
          <BudgetInput />
        </Container>

        <Container as="div">
          <DebtStrategySelect />
        </Container>
      </div>
    );
  }
}
