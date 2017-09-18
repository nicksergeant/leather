import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initChannel } from '../actions/channels';
import { selectActiveAccount } from '../selectors/accounts';
import { selectActivePanel } from '../selectors/panels';
import { selectChannelByName } from '../selectors/channels';
import { setActivePanel } from '../actions/panels';

const mapDispatchToProps = {
  initChannel,
  setActivePanel,
};

const mapStateToProps = state => {
  const account = selectActiveAccount(state);
  return {
    account,
    activePanel: selectActivePanel(state),
    channel: account
      ? selectChannelByName(state, `stashes:${account.get('id')}`)
      : null,
  };
};

class StashesContainer extends Component {
  static get propTypes() {
    return {
      account: PropTypes.instanceOf(Immutable.Map),
      activePanel: PropTypes.string,
      initChannel: PropTypes.func,
      setActivePanel: PropTypes.func,
    };
  }

  componentWillMount() {
    this.maybeInitChannel(this.props);
    this.props.setActivePanel('stashes');
  }

  componentWillReceiveProps(props) {
    this.maybeInitChannel(props);
    if (props.activePanel !== 'stashes') {
      props.setActivePanel('stashes');
    }
  }

  componentWillUnmount() {
    this.props.setActivePanel(null);
  }

  maybeInitChannel(props) {
    const { account, channel } = props;

    if (!channel && account && account.get('id')) {
      this.props.initChannel(`stashes:${account.get('id')}`);
    }

    if (channel && channel.state === 'closed') {
      channel.join().receive('ok', () => {
        // handle incoming stashes
      });
    }
  }

  render() {
    if (!this.props.account || !this.props.account.get('id')) {
      return <div />;
    }
    return <div className="column content" />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StashesContainer);
