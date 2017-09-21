import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Transaction extends Component {
  static get propTypes() {
    return {
      onSaveTransaction: PropTypes.func.isRequired,
      onUpdateAmount: PropTypes.func.isRequired,
      onUpdateName: PropTypes.func.isRequired,
      transaction: PropTypes.instanceOf(Immutable.Map),
    };
  }

  render() {
    return (
      <tr className="transaction">
        <td>09/13/2017</td>
        <td>
          <input
            onBlur={() => this.props.onSaveTransaction(this.props.transaction)}
            onChange={e => {
              this.props.onUpdateName({
                name: e.target.value,
                transactionId: this.props.transaction.get('id'),
              });
            }}
            type="text"
            value={this.props.transaction.get('name')}
          />
        </td>
        <td>Automotive</td>
        <td>
          <input
            onBlur={() => this.props.onSaveTransaction(this.props.transaction)}
            onChange={e => {
              this.props.onUpdateAmount({
                amount: parseInt(e.target.value, 10),
                transactionId: this.props.transaction.get('id'),
              });
            }}
            type="text"
            value={this.props.transaction.get('amount')}
          />
        </td>
      </tr>
    );
  }
}

export default Transaction;
