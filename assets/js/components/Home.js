import Footer from './Footer';
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container is-fullhd">
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
  }
}

export default Home;
