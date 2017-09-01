import LogoutButton from './LogoutButton.js';
import React from 'react';

class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      channel: window.socket.channel('dashboard', {}),
    };
  }

  componentWillMount() {
    this.state.channel.join();
  }

  componentWillUnmount() {
    this.state.channel.leave();
  }

  createAccount() {
    console.log('create');
  }

  render() {
    return (
      <div>
        <div className="container is-fullhd">
          <div style={{ margin: '10px' }} className="notification">
            You are logged in as {window.currentUser}.
            <LogoutButton />
          </div>
          <a onClick={this.createAccount.bind(this)}>Create account</a>
        </div>
      </div>
    );
  }
}

Dashboard.PropTypes = {};

export default Dashboard;
