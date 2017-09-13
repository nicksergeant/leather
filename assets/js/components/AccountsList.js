import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { selectAllAccounts } from '../reducers/accounts';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    accounts: selectAllAccounts(state)
  };
};

class AccountsList extends Component {
  static get propTypes() {
    return {
      accounts: PropTypes.instanceOf(Immutable.List),
    };
  }

  render() {
    const accounts = this.props.accounts.map(account => {
      return (
        <li key={account.get('id')}>
          <Link to={`/${account.get('id')}/transactions`}>
            {account.get('name')}
            <br />
          </Link>
        </li>
      );
    });
    return (
      <div>
        <p className="menu-label">Accounts</p>
        <ul className="menu-list">{accounts}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsList);
