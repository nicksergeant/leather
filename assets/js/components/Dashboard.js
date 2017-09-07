import Immutable from 'immutable';
import LogoutButton from './LogoutButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { addAccount } from '../actions/accounts';
import { connect } from 'react-redux';
import { getChannelByName } from '../reducers/channels';
import { selectAllAccounts } from '../reducers/accounts';

const mapDispatchToProps = {
  addAccount,
};

const mapStateToProps = state => {
  return {
    accounts: selectAllAccounts(state),
    channel: getChannelByName(state, 'dashboard'),
  };
};

class Dashboard extends Component {
  static get propTypes() {
    return {
      accounts: PropTypes.instanceOf(Immutable.List),
      addAccount: PropTypes.func,
      channel: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount() {
    this.props.addAccount(this.props.channel, {
      name: 'Test Account',
    });
  }

  render() {
    const accounts = this.props.accounts.map(account => {
      return (
        <Link key={account.get('id')} to={`/accounts/${account.get('id')}`}>
          {account.get('name')}
          <br />
        </Link>
      );
    });
    return (
      <div>
        <div className="container is-fullhd">
          <div style={{ margin: '10px' }} className="notification">
            You are logged in as {window.LEATHER.user.email}.
            <LogoutButton />
          </div>
          <a onClick={this.createAccount}>Create account</a>
        </div>
        Dashboard<br />
        {accounts}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
