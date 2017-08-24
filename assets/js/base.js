import Dashboard from './components/Dashboard';
import Home from './components/Home';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const reducers = [
  () => {
    return {};
  }
];

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

window.store = store;

const history = syncHistoryWithStore(browserHistory, store);
const rootElem = document.getElementById('root');

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

  ReactDOM.render(
    <Provider store={store}>
      {router}
    </Provider>,
    rootElem
  );
}
