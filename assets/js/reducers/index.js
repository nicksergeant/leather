import { accounts, activeAccount } from './accounts';
import { activePanel } from './panels';
import { channels } from './channels';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  accounts,
  activeAccount,
  activePanel,
  channels,
  routing: routerReducer,
});
