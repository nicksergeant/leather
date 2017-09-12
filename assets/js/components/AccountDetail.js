import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getActiveAccount } from '../reducers/accounts';
import { getChannelByName } from '../reducers/channels';
import { initChannel } from '../actions/channels';
import { setActiveAccount } from '../actions/accounts';

const mapDispatchToProps = {
  initChannel,
  setActiveAccount,
};

const mapStateToProps = (state, props) => {
  const accountId = props.params.id ? parseInt(props.params.id, 10) : null;

  return {
    account: getActiveAccount(state),
    accountId,
    channel: getChannelByName(state, `accounts:${accountId}`),
  };
};

class AccountDetail extends Component {
  static get propTypes() {
    return {
      account: PropTypes.object,
      initChannel: PropTypes.func,
      setActiveAccount: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.maybeInitChannel(props);
    this.maybeSetActiveAccount(props);

    this.state = {
      accountNotFound: false,
    };
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
    this.maybeSetActiveAccount(props);
  }

  componentWillUnmount() {
    this.props.setActiveAccount(null);
  }

  maybeInitChannel(props) {
    const channel = props.channel;

    if (!channel) {
      this.props.initChannel(`accounts:${props.accountId}`);
    }

    if (channel && channel.state === 'closed') {
      channel
        .join()
        .receive('ok', () => {
          // handle incoming transactions
        })
        .receive('error', error => {
          if (error.status === 404) {
            this.setState({
              accountNotFound: true,
            });
          }
        });
    }
  }

  maybeSetActiveAccount(props) {
    if (!props.account || props.account.id !== props.accountId) {
      props.setActiveAccount(props.accountId);
    }
  }

  render() {
    if (this.state.accountNotFound) {
      return <div>Account not found</div>;
    }
    if (!this.props.account) {
      return <div />;
    }
    return (
      <div>
        <Nav />
        Account detail<br />
        <Link to="/">Dashboard</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
