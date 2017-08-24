import Footer from './Footer.js';
import LogoutButton from './LogoutButton.js';
import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="container is-fullhd">
          <div style={{ margin: '10px' }} className="notification">
            You are logged in as {window.currentUser}.
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
