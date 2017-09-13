import AccountsList from './AccountsList';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

class Sidebar extends Component {
  static get propTypes() {
    return {};
  }

  render() {
    return (
      <aside className="menu sidebar">
        <AccountsList />
      </aside>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
