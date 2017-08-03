import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup';
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
    ...reducers, routing: routerReducer
  })
);

window.store = store;

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
