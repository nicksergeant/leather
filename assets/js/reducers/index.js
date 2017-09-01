import { accounts, activeAccount } from './accounts';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  accounts,
  activeAccount,
  routing: routerReducer,
});
