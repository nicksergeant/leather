import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChannelByName } from '../reducers/channels';
import { initChannel } from '../actions/channels';
import { setAccounts } from '../actions/accounts';

const mapDispatchToProps = {
  initChannel,
  setAccounts,
};

const mapStateToProps = state => {
  return {
    channel: getChannelByName(state, 'dashboard'),
  };
};

class Channels extends Component {
  static get propTypes() {
    return {
      children: PropTypes.object,
      initChannel: PropTypes.func,
      setAccounts: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.maybeInitChannel(props);
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
  }

  maybeInitChannel(props) {
    const channel = props.channel;

    if (!channel) {
      this.props.initChannel('dashboard');
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', ({ accounts }) => {
        this.props.setAccounts(accounts);
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
