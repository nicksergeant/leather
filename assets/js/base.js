import AppContainer from './containers/AppContainer';
import BudgetsContainer from './containers/BudgetsContainer';
import Dashboard from './components/Dashboard';
import ForecastContainer from './containers/ForecastContainer';
import Home from './components/Home';
import Raven from 'raven-js';
import React from 'react';
import ReactDOM from 'react-dom';
import StashesContainer from './containers/StashesContainer';
import TransactionsContainer from './containers/TransactionsContainer';
import rootReducer from './reducers/index';
import socket from './data/socket';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

if (window.env === 'prod') {
  Raven.config(
    'https://02dee3af493447c8a42dddf6923ccd8d@sentry.io/211762'
  ).install();
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(
  createStore
);

const store = createStoreWithMiddleware(rootReducer);
const history = syncHistoryWithStore(browserHistory, store);
const rootElem = document.getElementById('root');

if (rootElem) {
  if (window.LEATHER && window.LEATHER.user) {
    socket.connect();
    socket.onOpen(() => {
      const router = (
        <Router history={history}>
          <Route component={AppContainer}>
            <Route path="/" component={Dashboard} />
            <Route path="/:accountId/budgets" component={BudgetsContainer} />
            <Route path="/:accountId/forecast" component={ForecastContainer} />
            <Route path="/:accountId/stashes" component={StashesContainer} />
            <Route
              path="/:accountId/transactions"
              component={TransactionsContainer}
            />
          </Route>
        </Router>
      );
      ReactDOM.render(<Provider store={store}>{router}</Provider>, rootElem);
    });
  } else {
    const router = (
      <Router history={history}>
        <Route path="/" component={Home} />
      </Router>
    );
    ReactDOM.render(<Provider store={store}>{router}</Provider>, rootElem);
  }
}
