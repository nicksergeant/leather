import Nav from './Nav';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {};
};

class Stashes extends Component {
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
        Stashes
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stashes);
