import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

class Budgets extends Component {
  static get propTypes() {
    return {};
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        Budgets
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budgets);
