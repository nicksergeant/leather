import PropTypes from 'prop-types';
import React, { Component } from 'react';
import socket from '../data/socket';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getActiveAccount } from '../reducers/accounts';
import { setActiveAccount } from '../actions/accounts';

const mapDispatchToProps = {
  setActiveAccount,
};

const mapStateToProps = state => {
  return {
    account: getActiveAccount(state),
  };
};

class AccountDetail extends Component {
  static get propTypes() {
    return {
      account: PropTypes.object,
    };
  }

  constructor(props) {
    super();

    this.maybeSetActiveAccount(props);

    this.state = {
      channel: socket.channel('accounts:123', {}),
    };
  }

  componentWillMount() {
    this.state.channel.join();
  }

  componentWillReceiveProps(props) {
    this.maybeSetActiveAccount(props);
  }

  componentWillUnmount() {
    this.state.channel.leave();
  }

  maybeSetActiveAccount(props) {
    const accountIdInParams = parseInt(props.params.id, 10);
    if (!props.account || props.account.id !== accountIdInParams) {
      props.setActiveAccount(accountIdInParams, 10);
    }
  }

  render() {
    if (!this.props.account) {
      return <div />;
    }
    return (
      <div>
        Account detail<br />
        <Link to="/">Dashboard</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
