import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFieldGroup from '@instructure/ui-core/lib/components/FormFieldGroup';
import NumberInput from '@instructure/ui-core/lib/components/NumberInput';

import { getAccountList } from 'js/shared/accounts/AccountAccessor';
import { getBudget } from 'js/shared/plans/PlanAccessor';
import { updateBudget } from 'js/shared/plans/PlanActions';

class Controls extends Component {
  constructor (props) {
    super(props);

    this.bindCurrentAmountInput = (ref) => { this.currentAmountInput = ref };
    this.bindRefreshAmountInput = (ref) => { this.refreshAmountInput = ref };

    this.maybeUpdateBudget = (field, value) => {
      const inputValue = parseFloat(value, 10);
      if (Number.isFinite(inputValue) && inputValue !== this.props.budget[field]) {
        const budget = { ...this.props.budget };
        budget[field] = inputValue;
        this.props.updateBudget(budget);
      }
    };

    this.onCurrentAmountKeyDown = (event) => {
      if (event.keyCode === 13) { // Enter
        this.maybeUpdateBudget('currentAmount', event.target.value);
      }
    };

    this.onCurrentAmountBlur = (event) => {
      this.maybeUpdateBudget('currentAmount', event.target.value);
    };

    this.onCurrentAmountChange = (event, value) => {
      if (event.target !== this.currentAmountInput) {
        this.maybeUpdateBudget('currentAmount', value);
      }
    };

    this.onRefreshAmountKeyDown = (event) => {
      if (event.keyCode === 13) { // Enter
        this.maybeUpdateBudget('refreshAmount', event.target.value);
      }
    };

    this.onRefreshAmountBlur = (event) => {
      this.maybeUpdateBudget('refreshAmount', event.target.value);
    };

    this.onRefreshAmountChange = (event, value) => {
      if (event.target !== this.refreshAmountInput) {
        this.maybeUpdateBudget('refreshAmount', value);
      }
    };

    this.state = {
      totalMinimumPayment: this.props.accounts.reduce((sum, account) => sum + account.minimumContribution, 0)
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      totalMinimumPayment: this.props.accounts.reduce((sum, account) => sum + account.minimumContribution, 0)
    });
  }

  render () {
    const messages = [];
    if (this.props.budget < this.state.totalMinimumPayment) {
      messages.push({ type: 'error', text: `Total minimum payment is ${this.state.totalMinimumPayment}` });
    }

    return (
      <FormFieldGroup
        description="Budget"
        layout="stacked"
        rowSpacing="small"
      >
        <NumberInput
          inputRef={this.bindCurrentAmountInput}
          defaultValue={`${this.props.budget.currentAmount}`}
          label="Current Amount"
          onBlur={this.onCurrentAmountBlur}
          onChange={this.onCurrentAmountChange}
          onKeyDown={this.onCurrentAmountKeyDown}
          step="10"
        />

        <NumberInput
          inputRef={this.bindRefreshAmountInput}
          defaultValue={`${this.props.budget.refreshAmount}`}
          label="Refresh Amount"
          messages={messages}
          onBlur={this.onRefreshAmountBlur}
          onChange={this.onRefreshAmountChange}
          onKeyDown={this.onRefreshAmountKeyDown}
          step="10"
        />
      </FormFieldGroup>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    accounts: getAccountList(state),
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
