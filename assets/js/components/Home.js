import Footer from './Footer';
import React from 'react';

const Home = () => {
  return (
    <div>
      <div className="container is-fluid">
        <div
          className="columns is-mobile is-centered"
          style={{ margin: '50px 0 60px 0' }}
        >
          <article className="message">
            <div className="message-body" style={{ textAlign: 'center' }}>
              <p>Let's do this. 🎉</p>
              <br />
              <a className="button" href="/login">
                Login
              </a>
              <br />
              <br />
              <a className="button" href="/signup">
                Signup
              </a>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Home.propTypes = {};

export default Footer;
