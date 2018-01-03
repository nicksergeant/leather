import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const accounts = (state = Immutable.List(), { type, payload }) => {
  switch (type) {
    case actionTypes.ACCOUNT_ADDED:
      return state.push(Immutable.fromJS(payload));
    case actionTypes.ACCOUNT_DELETED:
      return state.filter(account => {
        return account.get('id') !== payload.id;
      });
    case actionTypes.ACCOUNT_UPDATED:
      return state.map(account => {
        if (account.get('id') === payload.id) {
          return account.merge(payload);
        }
        return account;
      });
    case actionTypes.SET_ACCOUNTS:
      return Immutable.fromJS(payload);
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
