import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
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
};

Footer.propTypes = {};

export default Footer;
