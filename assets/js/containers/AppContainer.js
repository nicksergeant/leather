import Immutable from 'immutable';
import NavContainer from './NavContainer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SidebarContainer from './SidebarContainer';
import { connect } from 'react-redux';
import { initChannel } from '../actions/channels';
import { selectActiveAccount, selectAllAccounts } from '../selectors/accounts';
import { selectChannelByName } from '../selectors/channels';
import {
  accountAdded,
  accountDeleted,
  accountUpdated,
  setAccounts,
  setActiveAccount,
} from '../actions/accounts';

const mapDispatchToProps = {
  accountAdded,
  accountDeleted,
  accountUpdated,
  initChannel,
  setAccounts,
  setActiveAccount,
};

const mapStateToProps = (state, props) => {
  const accountId = props.params.accountId
    ? parseInt(props.params.accountId, 10)
    : null;
  return {
    account: selectActiveAccount(state),
    accounts: selectAllAccounts(state),
    accountId,
    channel: selectChannelByName(state, `accounts:${window.LEATHER.user.id}`),
  };
};

class AppContainer extends Component {
  static get propTypes() {
    return {
      account: PropTypes.instanceOf(Immutable.Map),
      accountAdded: PropTypes.func,
      accountDeleted: PropTypes.func,
      accountUpdated: PropTypes.func,
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
      props.initChannel(`accounts:${window.LEATHER.user.id}`);
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', ({ accounts }) => {
        props.setAccounts(accounts);
      });
      channel.on('account_added', account => {
        props.accountAdded(account);
      });
      channel.on('account_deleted', account => {
        props.accountDeleted(account);
      });
      channel.on('account_updated', account => {
        props.accountUpdated(account);
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
        <NavContainer />
        <div className="columns is-gapless">
          <div className="column is-one-quarter">
            <SidebarContainer />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
