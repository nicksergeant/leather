import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addTransaction, addTransactions } from '../actions/transactions';
import { connect } from 'react-redux';
import { initChannel } from '../actions/channels';
import { selectActiveAccount } from '../selectors/accounts';
import { selectChannelByName } from '../selectors/channels';
import { selectTransactionsForActiveAccount } from '../selectors/transactions';
import { setActivePanel } from '../actions/panels';

const mapDispatchToProps = {
  addTransaction,
  addTransactions,
  initChannel,
  setActivePanel,
};

const mapStateToProps = state => {
  const account = selectActiveAccount(state);
  return {
    account,
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
      addTransaction: PropTypes.func,
      addTransactions: PropTypes.func,
      channel: PropTypes.object,
      initChannel: PropTypes.func,
      setActivePanel: PropTypes.func,
      transactions: PropTypes.instanceOf(Immutable.List),
    };
  }

  constructor(props) {
    super(props);
    this.createTransaction = this.createTransaction.bind(this);
  }

  componentWillMount() {
    this.maybeInitChannel(this.props);
    this.props.setActivePanel('transactions');
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
    props.setActivePanel('transactions');
  }

  componentWillUnmount() {
    this.props.setActivePanel(null);
  }

  createTransaction() {
    this.props.addTransaction(this.props.channel, {
      amount: 112,
      name: 'Test Transaction Name',
      official_name: 'Official name',
      type: 'debit',
    });
  }

  maybeInitChannel(props) {
    const { account, channel } = props;

    if (!channel && account && account.get('id')) {
      this.props.initChannel(`transactions:${account.get('id')}`);
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', ({ transactions }) => {
        this.props.addTransactions(transactions);
      });
    }
  }

  render() {
    if (!this.props.account || !this.props.account.get('id')) {
      return <div />;
    }

    const transactions = this.props.transactions.map(transaction => (
      <tr key={transaction.get('id')}>
        <td>09/13/2017</td>
        <td>{transaction.get('name')}</td>
        <td>Automotive</td>
        <td>$165.73</td>
      </tr>
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
