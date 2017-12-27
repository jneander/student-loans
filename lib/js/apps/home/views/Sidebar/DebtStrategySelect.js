import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Select from '@instructure/ui-core/lib/components/Select';

import { getDebtStrategy } from 'js/shared/plans/PlanAccessor';
import { setDebtStrategy } from 'js/shared/plans/PlanActions';

class DebtStrategySelect extends PureComponent {
  constructor (props) {
    super(props);

    this.handleChange = (event) => {
      this.props.onChange(event.target.value);
    }
  }

  render () {
    return (
      <Select
        label="Debt Strategy"
        onChange={this.handleChange}
      >
        <option value="custom">Custom</option>
        <option value="avalanche">Avalanche</option>
        <option value="snowball">Snowball</option>
      </Select>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    debtStrategy: getDebtStrategy(state)
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onChange (debtStrategy) {
      dispatch(setDebtStrategy(debtStrategy));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtStrategySelect);
