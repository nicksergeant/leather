import { accounts, activeAccount } from './accounts';
import { channels } from './channels';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  accounts,
  activeAccount,
  channels,
  routing: routerReducer,
});
