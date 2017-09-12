import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

class Forecast extends Component {
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
        Forecast
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
