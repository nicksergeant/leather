import AccountListContainer from './AccountListContainer';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addAccount } from '../actions/accounts';
import { connect } from 'react-redux';
import { selectChannelByName } from '../selectors/channels';

const mapDispatchToProps = {
  addAccount,
};

const mapStateToProps = state => {
  return {
    channel: selectChannelByName(state, 'accounts'),
  };
};

class SidebarContainer extends Component {
  static get propTypes() {
    return {
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
    return (
      <aside className="menu sidebar">
        <button
          className="button"
          style={{ marginBottom: '24px', marginLeft: '24px' }}
          onClick={this.createAccount}
        >
          <span className="icon is-small">
            <i className="fa fa-bank" />
          </span>
          <span>Create new account</span>
        </button>
        <AccountListContainer channel={this.props.channel} />
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
