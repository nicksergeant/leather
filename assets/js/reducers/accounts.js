import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';
import { createSelector } from 'reselect';

export const selectActiveAccount = state => state.activeAccount;
export const selectAllAccounts = state => state.accounts;

export const getActiveAccount = createSelector(
  selectActiveAccount,
  selectAllAccounts,
  (accountId, accounts) => {
    return accounts.find(account => account.id === accountId);
  }
);

export const accounts = (state = Immutable.List(), { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_ACCOUNT_SUCCESS:
      return state.push(payload);
    default:
      return state;
  }
};

export const activeAccount = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ACTIVE_ACCOUNT:
      return payload;
    default:
      return state;
  }
};
