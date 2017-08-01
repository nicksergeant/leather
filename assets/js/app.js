import App from './components/App';
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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/foo" component={App} />
      <Route path="/bar" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
