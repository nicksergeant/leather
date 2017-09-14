import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveAccount } from '../reducers/accounts';
import { getChannelByName } from '../reducers/channels';
import { initChannel } from '../actions/channels';

const mapDispatchToProps = {
  initChannel,
};

const mapStateToProps = state => {
  const account = getActiveAccount(state);
  return {
    account,
    channel: account
      ? getChannelByName(state, `forecast:${account.get('id')}`)
      : null,
  };
};

class Forecast extends Component {
  static get propTypes() {
    return {
      account: PropTypes.instanceOf(Immutable.Map),
      initChannel: PropTypes.func,
    };
  }

  componentWillMount() {
    this.maybeInitChannel(this.props);
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
  }

  maybeInitChannel(props) {
    const { account, channel } = props;

    if (!channel && account && account.get('id')) {
      this.props.initChannel(`forecast:${account.get('id')}`);
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', () => {
        // handle incoming forecast
      });
    }
  }

  render() {
    if (!this.props.account || !this.props.account.get('id')) {
      return <div />;
    }
    return (
      <div className="column content">
        Forecast for account{' '}
        <strong>#{this.props.account.get('id')}</strong>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
