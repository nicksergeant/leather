import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const plaidItems = (state = Immutable.List(), { type, payload }) => {
  switch (type) {
    case actionTypes.PLAID_ITEM_ADDED:
      return state.push(Immutable.fromJS(payload));
    case actionTypes.SET_PLAID_ITEMS:
      return Immutable.fromJS(payload);
    default:
      return state;
  }
};
