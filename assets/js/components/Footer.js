import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
  render() {
    return (
      <footer className="footer" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="content has-text-centered">
            <Link to="/">
              <img src="/favicon.ico" />
              <strong style={{ marginLeft: '6px', verticalAlign: '3px' }}>
                Leather
              </strong>
            </Link>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
