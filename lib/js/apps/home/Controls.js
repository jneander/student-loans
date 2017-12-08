import React from 'react';
import { connect } from 'react-redux';
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup';
import Select from '@instructure/ui-core/lib/components/Select';
import NumberInput from '@instructure/ui-core/lib/components/NumberInput';

import { listAccounts } from 'js/shared/accounts/AccountAccessor';
import { getBudget } from 'js/shared/plans/PlanAccessor';
import { updateBudget } from 'js/shared/plans/PlanActions';

class Controls extends React.Component {
  constructor (props) {
    super(props);

    this.bindBudgetInput = (ref) => { this.budgetInput = ref };

    this.maybeUpdateBudget = (value) => {
      const inputValue = parseFloat(value, 10);
      if (Number.isFinite(inputValue)) {
        this.setState({
          budget: inputValue
        }, () => {
          this.props.updateBudget(inputValue);
        });
      }
    };

    this.onBudgetKeyDown = (event) => {
      if (event.keyCode === 13) { // Enter
        this.maybeUpdateBudget(event.target.value);
      }
    };

    this.onProjectionTypeChange = (event) => {
      this.props.onProjectionTypeChange(event.target.value);
    };

    this.onBudgetChange = (event, value) => {
      if (event.target !== this.budgetInput) {
        this.maybeUpdateBudget(value);
      }
    };

    this.state = {
      budget: this.props.budget,
      totalMinimumPayment: this.props.accounts.reduce((sum, account) => sum + account.minimum, 0)
    };
  }

  render () {
    const messages = [];
    if (this.state.budget < this.state.totalMinimumPayment) {
      messages.push({ type: 'error', text: `Total minimum payment is ${this.state.totalMinimumPayment}` });
    }

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

        <NumberInput
          inputRef={this.bindBudgetInput}
          defaultValue={`${this.state.budget}`}
          label="Budget"
          messages={messages}
          onChange={this.onBudgetChange}
          onKeyDown={this.onBudgetKeyDown}
          step="10"
        />
      </FormFieldGroup>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    accounts: listAccounts(state),
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
