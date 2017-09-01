import Dashboard from './components/Dashboard';
import Home from './components/Home';
import React from 'react';
import ReactDOM from 'react-dom';
import socket from './data/socket';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const reducers = [
  () => {
    return {};
  },
];

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.socket = socket;

const history = syncHistoryWithStore(browserHistory, store);
const rootElem = document.getElementById('root');

socket.onOpen(() => {
  if (rootElem) {
    let router;
    if (window.currentUser) {
      router = (
        <Router history={history}>
          <Route path="/" component={Dashboard} />
        </Router>
      );
    } else {
      router = (
        <Router history={history}>
          <Route path="/" component={Home} />
        </Router>
      );
    }

    ReactDOM.render(<Provider store={store}>{router}</Provider>, rootElem);
  }
});
