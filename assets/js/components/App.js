import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          Links:<br />
          <Link to="/">Home</Link><br />
          <Link to="/foo">Foo</Link><br />
          <Link to="/bar">Bar</Link>
        </header>
      </div>
    );
  }
}

export default App;
