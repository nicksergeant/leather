import Immutable from 'immutable';
import LogoutLink from '../components/LogoutLink';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { selectActivePanel } from '../reducers/panels';
import { selectDefaultAccount } from '../reducers/accounts';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    activePanel: selectActivePanel(state),
    defaultAccount: selectDefaultAccount(state),
  };
};

class NavContainer extends Component {
  static get propTypes() {
    return {
      activePanel: PropTypes.string,
      defaultAccount: PropTypes.instanceOf(Immutable.Map),
    };
  }

  panelIsActive(panel) {
    return panel === this.props.activePanel ? 'active' : '';
  }

  render() {
    const accountSlug = this.props.defaultAccount
      ? `/${this.props.defaultAccount.get('id')}`
      : '';
    return (
      <nav className="navbar" style={{ background: '#F7F5EF' }}>
        <div className="navbar-brand">
          <Link className="navbar-item logo" to="/">
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
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link
              className={`navbar-item ${this.panelIsActive('transactions')}`}
              to={`${accountSlug}/transactions`}
            >
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                }}
              >
                <i className="fa fa-bars" />
              </span>
              Transactions
            </Link>
            <Link
              className={`navbar-item ${this.panelIsActive('forecast')}`}
              to={`${accountSlug}/forecast`}
            >
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                }}
              >
                <i className="fa fa-line-chart" />
              </span>
              Forecast
            </Link>
            <Link
              className={`navbar-item ${this.panelIsActive('stashes')}`}
              to={`${accountSlug}/stashes`}
            >
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
                }}
              >
                <i className="fa fa-database" />
              </span>
              Stashes
            </Link>
            <Link
              className={`navbar-item ${this.panelIsActive('budgets')}`}
              to={`${accountSlug}/budgets`}
            >
              <span
                className="icon"
                style={{
                  color: '#394248',
                  marginRight: '.5em',
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

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
