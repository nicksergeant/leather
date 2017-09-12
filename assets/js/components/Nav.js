import LogoutLink from './LogoutLink';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar" style={{ background: '#F7F5EF' }}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              height="28"
              src="/images/logo-header-mark.png"
              style={{ marginRight: '10px' }}
              width="37"
            />
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
            <Link className="navbar-item" to="/">
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
            </Link>
            <Link className="navbar-item" to="/forecast">
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
            </Link>
            <Link className="navbar-item" to="stashes">
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
            </Link>
            <Link className="navbar-item" to="/budgets">
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
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{window.LEATHER.user.email}</a>
              <div className="navbar-dropdown is-right">
                <LogoutLink className="navbar-item" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
