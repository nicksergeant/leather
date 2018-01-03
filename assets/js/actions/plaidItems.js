import actionTypes from '../actions/actionTypes';

export const plaidItemAdded = payload => {
  return {
    payload,
    type: actionTypes.PLAID_ITEM_ADDED,
  };
};

export const setPlaidItems = payload => {
  return {
    payload,
    type: actionTypes.SET_PLAID_ITEMS,
  };
};
