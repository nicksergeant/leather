import Immutable from 'immutable';
import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import { getActiveAccount, selectAllAccounts } from '../reducers/accounts';
import { getChannelByName } from '../reducers/channels';
import { initChannel } from '../actions/channels';
import { setAccounts, setActiveAccount } from '../actions/accounts';

const mapDispatchToProps = {
  initChannel,
  setAccounts,
  setActiveAccount,
};

const mapStateToProps = (state, props) => {
  const accountId = props.params.accountId
    ? parseInt(props.params.accountId, 10)
    : null;
  return {
    account: getActiveAccount(state),
    accounts: selectAllAccounts(state),
    accountId,
    channel: getChannelByName(state, 'accounts'),
  };
};

class App extends Component {
  static get propTypes() {
    return {
      account: PropTypes.instanceOf(Immutable.Map),
      accountId: PropTypes.number,
      accounts: PropTypes.instanceOf(Immutable.List),
      children: PropTypes.object,
      initChannel: PropTypes.func,
      setAccounts: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.maybeInitChannel(props);
    this.maybeSetActiveAccount(props);
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
    this.maybeSetActiveAccount(props);
  }

  maybeInitChannel(props) {
    const channel = props.channel;

    if (!channel) {
      this.props.initChannel('accounts');
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', ({ accounts }) => {
        this.props.setAccounts(accounts);
      });
    }
  }

  maybeSetActiveAccount(props) {
    if (!props.account || props.account.id !== props.accountId) {
      props.setActiveAccount(props.accountId);
    }
  }

  render() {
    const { accounts, account, accountId } = this.props;

    if (accountId && accounts.size && !account) {
      return <div>404</div>;
    }

    return (
      <div>
        <Nav />
        <div className="container is-fluid">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <Sidebar />
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
