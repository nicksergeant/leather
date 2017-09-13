import Nav from './Nav';
import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container is-fullhd">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <Sidebar />
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
