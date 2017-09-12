import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            LEATHER
          </Link>
          <div className="navbar-burger burger" data-target="navMenubd-example">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenubd-example" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="">
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                  marginTop: '2px',
                }}
              >
                <i className="fa fa-bars" />
              </span>
              Transactions
            </a>
            <a className="navbar-item" href="">
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                  marginTop: '2px',
                }}
              >
                <i className="fa fa-line-chart" />
              </span>
              Forecast
            </a>
            <a className="navbar-item" href="">
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                  marginTop: '2px',
                }}
              >
                <i className="fa fa-database" />
              </span>
              Stashes
            </a>
            <a className="navbar-item" href="">
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                  marginTop: '2px',
                }}
              >
                <i className="fa fa-bar-chart" />
              </span>
              Budgets
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
