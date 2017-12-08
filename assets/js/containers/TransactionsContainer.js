import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Transaction from '../components/Transaction.js';
import { connect } from 'react-redux';
import { accountUpdated } from '../actions/accounts';
import { initChannel } from '../actions/channels';
import { selectActiveAccount } from '../selectors/accounts';
import { selectActivePanel } from '../selectors/panels';
import { selectChannelByName } from '../selectors/channels';
import { selectTransactionsForActiveAccount } from '../selectors/transactions';
import { setActivePanel } from '../actions/panels';
import {
  centsToDollars,
  dollarsToCents,
  stringIsNumber,
} from '../data/transactions';
import {
  addTransaction,
  addTransactions,
  deleteTransaction,
  saveTransaction,
  transactionAdded,
  transactionDeleted,
  transactionUpdated,
  updateTransactionAmount,
  updateTransactionCategory,
  updateTransactionDate,
  updateTransactionName,
} from '../actions/transactions';

const mapDispatchToProps = {
  accountUpdated,
  addTransaction,
  addTransactions,
  deleteTransaction,
  initChannel,
  saveTransaction,
  setActivePanel,
  transactionAdded,
  transactionDeleted,
  transactionUpdated,
  updateTransactionAmount,
  updateTransactionCategory,
  updateTransactionDate,
  updateTransactionName,
};

const mapStateToProps = state => {
  const account = selectActiveAccount(state);
  return {
    account,
    activePanel: selectActivePanel(state),
    channel: account
      ? selectChannelByName(state, `transactions:${account.get('id')}`)
      : null,
    transactions: account
      ? selectTransactionsForActiveAccount(state)
      : Immutable.List(),
  };
};

class TransactionsContainer extends Component {
  static get propTypes() {
    return {
      account: PropTypes.instanceOf(Immutable.Map),
      accountUpdated: PropTypes.func,
      activePanel: PropTypes.string,
      addTransaction: PropTypes.func,
      addTransactions: PropTypes.func,
      deleteTransaction: PropTypes.func,
      channel: PropTypes.object,
      initChannel: PropTypes.func,
      saveTransaction: PropTypes.func,
      setActivePanel: PropTypes.func,
      transactionAdded: PropTypes.func,
      transactionDeleted: PropTypes.func,
      transactionUpdated: PropTypes.func,
      transactions: PropTypes.instanceOf(Immutable.List),
      updateTransactionAmount: PropTypes.func,
      updateTransactionCategory: PropTypes.func,
      updateTransactionDate: PropTypes.func,
      updateTransactionName: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.createTransaction = this.createTransaction.bind(this);
    this.onDeleteTransaction = this.onDeleteTransaction.bind(this);
    this.onSaveTransaction = this.onSaveTransaction.bind(this);
  }

  componentWillMount() {
    this.maybeInitChannel(this.props);
    this.props.setActivePanel('transactions');
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
    if (props.activePanel !== 'transactions') {
      props.setActivePanel('transactions');
    }
  }

  componentWillUnmount() {
    this.props.setActivePanel(null);
  }

  createTransaction() {
    this.props.addTransaction(this.props.channel, {
      amount: 0,
      date: '1969-02-02',
      name: `Test Transaction Name Account #${this.props.account.get('id')}`,
      official_name: 'Official name',
      type: 'debit',
    });
  }

  maybeInitChannel(props) {
    const { account, channel } = props;

    if (!channel && account && account.get('id')) {
      props.initChannel(`transactions:${account.get('id')}`);
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', ({ transactions }) => {
        props.addTransactions(transactions);
      });
      channel.on('account_updated', acc => {
        props.accountUpdated(acc);
      });
      channel.on('transaction_added', transaction => {
        props.transactionAdded(transaction);
      });
      channel.on('transaction_deleted', transaction => {
        props.transactionDeleted(transaction);
      });
      channel.on('transaction_updated', transaction => {
        props.transactionUpdated(transaction);
      });
    }
  }

  onDeleteTransaction(transaction) {
    this.props.deleteTransaction(this.props.channel, transaction);
  }

  onSaveTransaction(transaction) {
    if (stringIsNumber(transaction.get('amount'))) {
      const updatedTransaction = transaction.set(
        'amount',
        dollarsToCents(transaction.get('amount'))
      );
      this.props.saveTransaction(this.props.channel, updatedTransaction);
    }
  }

  render() {
    if (!this.props.account || !this.props.account.get('id')) {
      return <div />;
    }

    const transactions = this.props.transactions.map(transaction => (
      <Transaction
        key={transaction.get('id')}
        onDeleteTransaction={this.onDeleteTransaction}
        onSaveTransaction={this.onSaveTransaction}
        onUpdateAmount={this.props.updateTransactionAmount}
        onUpdateCategory={this.props.updateTransactionCategory}
        onUpdateDate={this.props.updateTransactionDate}
        onUpdateName={this.props.updateTransactionName}
        transaction={transaction}
      />
    ));

    return (
      <div className="column">
        <div
          className="columns is-gapless"
          style={{
            borderBottom: '1px solid #E5E2DD',
            marginBottom: '24px',
            padding: '12px',
          }}
        >
          <div className="column has-text-centered">
            <a
              className="button is-pulled-left is-primary"
              onClick={this.createTransaction}
              style={{ width: '241px' }}
            >
              <span className="icon">
                <i className="fa fa-plus" />
              </span>
              <span>New transaction</span>
            </a>
          </div>
          <div className="column has-text-centered">
            <p className="subtitle is-5" style={{ marginTop: '4px' }}>
              <strong>{this.props.transactions.size}</strong>&nbsp;transactions
            </p>
          </div>
          <div className="column has-text-centered">
            <div className="field has-addons is-pulled-right">
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  placeholder="Search transactions"
                  type="text"
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <table className="table is-fullwidth is-narrow">
          <thead>
            <tr>
              <th>Date</th>
              <th>Payee</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{transactions}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  TransactionsContainer
);
