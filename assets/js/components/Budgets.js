import Immutable from 'immutable';
import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sidebar from './Sidebar';
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
    channel: getChannelByName(state, `budgets:${accountId}`),
  };
};

class Budgets extends Component {
  static get propTypes() {
    return {
      account: PropTypes.instanceOf(Immutable.Map),
      initChannel: PropTypes.func,
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

  maybeInitChannel(props) {
    const channel = props.channel;

    if (!channel) {
      this.props.initChannel(`budgets:${props.accountId}`);
    }

    if (channel && channel.state === 'closed') {
      channel
        .join()
        .receive('ok', () => {
          // handle incoming budgets
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
        <div className="container is-fluid">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <Sidebar />
            </div>
            <div className="column content">
              Budgets for account{' '}
              <strong>#{this.props.account.get('id')}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budgets);
