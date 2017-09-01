import LogoutButton from './LogoutButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import socket from '../data/socket';
import { Link } from 'react-router';
import { addAccount } from '../actions/accounts';
import { selectAllAccounts } from '../reducers/accounts';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  addAccount,
};

const mapStateToProps = state => {
  return {
    accounts: selectAllAccounts(state),
  };
};

class Dashboard extends Component {
  static get propTypes() {
    return {
      addAccount: PropTypes.func,
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
    this.state.channel.join();
  }

  componentWillUnmount() {
    this.state.channel.leave();
  }

  createAccount() {
    this.props.addAccount({
      id: 123,
    });
  }

  render() {
    return (
      <div>
        <div className="container is-fullhd">
          <div style={{ margin: '10px' }} className="notification">
            You are logged in as {window.currentUser}.
            <LogoutButton />
          </div>
          <a onClick={this.createAccount}>Create account</a>
        </div>
        Dashboard<br />
        <Link to="/accounts/123">Account 123</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
