import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const transactions = (
  state = Immutable.List(),
  { type, payload, response }
) => {
  switch (type) {
    case actionTypes.ADD_TRANSACTION_SUCCESS:
      return state.push(Immutable.fromJS(response));
    case actionTypes.UPDATE_TRANSACTION_AMOUNT:
      return state.map(transaction => {
        if (transaction.get('id') === payload.transactionId) {
          return transaction.merge({
            amount: payload.amount,
          });
        }
        return transaction;
      });
    case actionTypes.SET_TRANSACTIONS:
      return Immutable.fromJS(payload);
    case actionTypes.UPDATE_TRANSACTION_NAME:
      return state.map(transaction => {
        if (transaction.get('id') === payload.transactionId) {
          return transaction.merge({
            name: payload.name,
          });
        }
        return transaction;
      });
    case actionTypes.SAVE_TRANSACTION_SUCCESS:
      return state.map(transaction => {
        if (transaction.get('id') === response.id) {
          return transaction.merge(response);
        }
        return transaction;
      });
    default:
      return state;
  }
};
