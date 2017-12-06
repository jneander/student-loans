import React from 'react';
import { connect } from 'react-redux';
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup';
import Select from '@instructure/ui-core/lib/components/Select';
import TextInput from '@instructure/ui-core/lib/components/TextInput';

import { getBudget } from 'js/shared/plans/PlanAccessor';
import { updateBudget } from 'js/shared/plans/PlanActions';

class Controls extends React.Component {
  constructor (props) {
    super(props);

    this.onBudgetKeyDown = (event) => {
      if (event.keyCode === 13) { // Enter
        const inputValue = parseFloat(event.target.value, 10);
        if (Number.isFinite(inputValue)) {
          this.props.updateBudget(inputValue);
        }
      }
    };

    this.onProjectionTypeChange = (event) => {
      this.props.onProjectionTypeChange(event.target.value);
    };
  }

  render () {
    return (
      <FormFieldGroup
        description="Plan Options"
        layout="stacked"
        rowSpacing="small"
      >
        <Select
          label="Projection Type"
          onChange={this.onProjectionTypeChange}
        >
          <option value="totalBalance">Total Balance</option>
          <option value="totalInterest">Total Interest</option>
        </Select>

        <TextInput
          defaultValue={`${this.props.budget}`}
          label="Budget"
          onKeyDown={this.onBudgetKeyDown}
        />
      </FormFieldGroup>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    budget: getBudget(state)
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    updateBudget (budget) {
      dispatch(updateBudget(budget));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
