import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Transaction extends Component {
  static get propTypes() {
    return {
      onSaveTransaction: PropTypes.func.isRequired,
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
                transactionId: this.props.transaction.get('id'),
                name: e.target.value,
              });
            }}
            type="text"
            value={this.props.transaction.get('name')}
          />
        </td>
        <td>Automotive</td>
        <td>$165.73</td>
      </tr>
    );
  }
}

export default Transaction;
