import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { addAccount } from '../actions/accounts';
import { connect } from 'react-redux';
import { getChannelByName } from '../reducers/channels';

const mapDispatchToProps = {
  addAccount,
};

const mapStateToProps = state => {
  return {
    channel: getChannelByName(state, 'accounts'),
  };
};

class Dashboard extends Component {
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
      <div>
        <Nav />
        <div className="container is-fullhd">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <Sidebar />
            </div>
            <div className="column"></div>
          </div>
          <a onClick={this.createAccount}>Create account</a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
