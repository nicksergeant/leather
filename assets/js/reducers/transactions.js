import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const transactions = (
  state = Immutable.List(),
  { type, payload, response }
) => {
  switch (type) {
    case actionTypes.ADD_TRANSACTION_SUCCESS:
      return state.push(Immutable.fromJS(response));
    case actionTypes.ADD_TRANSACTIONS:
      return state.push(...Immutable.fromJS(payload));
    default:
      return state;
  }
};
