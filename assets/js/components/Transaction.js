import DatePicker from 'react-datepicker';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import moment from 'moment';

class Transaction extends Component {
  static get propTypes() {
    return {
      onDeleteTransaction: PropTypes.func.isRequired,
      onSaveTransaction: PropTypes.func.isRequired,
      onUpdateAmount: PropTypes.func.isRequired,
      onUpdateCategory: PropTypes.func.isRequired,
      onUpdateDate: PropTypes.func.isRequired,
      onUpdateName: PropTypes.func.isRequired,
      transaction: PropTypes.instanceOf(Immutable.Map),
    };
  }

  constructor() {
    super();
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.saveIfChanged = this.saveIfChanged.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = {
      changed: false,
    };
  }

  deleteTransaction() {
    this.props.onDeleteTransaction(this.props.transaction);
  }

  updateAmount(amount) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateAmount({
      amount,
      transactionId: this.props.transaction.get('id'),
    });
  }

  updateCategory(category) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateCategory({
      category,
      transactionId: this.props.transaction.get('id'),
    });
  }

  updateDate(date) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateDate({
      date: date.format('YYYY-MM-DD'),
      transactionId: this.props.transaction.get('id'),
    });
  }

  updateName(name) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateName({
      name,
      transactionId: this.props.transaction.get('id'),
    });
  }

  saveIfChanged() {
    if (this.state.changed) {
      this.setState({
        changed: false,
      });
      this.props.onSaveTransaction(this.props.transaction);
    }
  }

  render() {
    return (
      <tr className="transaction">
        <td>
          <DatePicker
            onBlur={() => this.saveIfChanged()}
            onChange={this.updateDate}
            selected={moment(this.props.transaction.get('date'))}
          />
        </td>
        <td>
          <input
            onBlur={() => this.saveIfChanged()}
            onChange={e => {
              this.updateName(e.target.value);
            }}
            type="text"
            value={this.props.transaction.get('name') || ''}
          />
        </td>
        <td>
          <input
            onBlur={() => this.saveIfChanged()}
            onChange={e => {
              this.updateCategory(e.target.value);
            }}
            type="text"
            value={this.props.transaction.get('category') || ''}
          />
        </td>
        <td>
          <input
            onBlur={() => this.saveIfChanged()}
            onChange={e => {
              this.updateAmount(e.target.value);
            }}
            type="text"
            value={this.props.transaction.get('amount')}
          />
        </td>
        <td>
          <a onClick={this.deleteTransaction}>Delete</a>
        </td>
      </tr>
    );
  }
}

export default Transaction;
