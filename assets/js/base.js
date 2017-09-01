import AccountDetail from './components/AccountDetail';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/index';
import socket from './data/socket';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = syncHistoryWithStore(browserHistory, store);
const rootElem = document.getElementById('root');

if (rootElem) {
  if (window.currentUser) {
    socket.onOpen(() => {
      const router = (
        <Router history={history}>
          <Route path="/" component={Dashboard} />
          <Route path="/accounts/:id" component={AccountDetail} />
        </Router>
      );
      ReactDOM.render(<Provider store={store}>{router}</Provider>, rootElem);
    });
    socket.connect();
  } else {
    const router = (
      <Router history={history}>
        <Route path="/" component={Home} />
      </Router>
    );
    ReactDOM.render(<Provider store={store}>{router}</Provider>, rootElem);
  }
}
