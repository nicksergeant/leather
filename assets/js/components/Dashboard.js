import Immutable from 'immutable';
import LogoutButton from './LogoutButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import socket from '../data/socket';
import { Link } from 'react-router';
import { addAccount, setAccounts } from '../actions/accounts';
import { connect } from 'react-redux';
import { selectAllAccounts } from '../reducers/accounts';

const mapDispatchToProps = {
  addAccount,
  setAccounts,
};

const mapStateToProps = state => {
  return {
    accounts: selectAllAccounts(state),
  };
};

class Dashboard extends Component {
  static get propTypes() {
    return {
      accounts: PropTypes.instanceOf(Immutable.List),
      addAccount: PropTypes.func,
      setAccounts: PropTypes.func,
    };
  }

  constructor() {
    super();

    this.state = {
      channel: socket.channel('dashboard', {}),
    };

    this.createAccount = this.createAccount.bind(this);
  }

  componentWillMount() {
    this.state.channel.join().receive('ok', ({ accounts }) => {
      this.props.setAccounts(accounts);
    });
  }

  componentWillUnmount() {
    this.state.channel.leave();
  }

  createAccount() {
    this.props.addAccount(this.state.channel, {
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
