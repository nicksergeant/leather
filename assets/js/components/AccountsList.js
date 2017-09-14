import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getActiveAccount, selectAllAccounts } from '../reducers/accounts';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    activeAccount: getActiveAccount(state),
    accounts: selectAllAccounts(state),
  };
};

class AccountsList extends Component {
  static get propTypes() {
    return {
      accounts: PropTypes.instanceOf(Immutable.List),
      activeAccount: PropTypes.instanceOf(Immutable.Map),
    };
  }

  render() {
    const accounts = this.props.accounts.map(account => {
      let classes;
      if (this.props.activeAccount) {
        const isActive =
          account.get('id') === this.props.activeAccount.get('id');
        classes = isActive ? 'active' : '';
      }
      return (
        <li key={account.get('id')}>
          <Link className={classes} to={`/${account.get('id')}/transactions`}>
            {account.get('name')} (#{account.get('id')})
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
