import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';
import { centsToDollars } from '../data/transactions';

export const transactions = (
  state = Immutable.List(),
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ADD_TRANSACTIONS:
      payload = payload.map((transaction) => {
        return {
          ...transaction,
          amount: centsToDollars(transaction.amount)
        }
      });
      return state.push(...Immutable.fromJS(payload));
    case actionTypes.UPDATE_TRANSACTION_AMOUNT:
      return state.map(transaction => {
        if (transaction.get('id') === payload.transactionId) {
          return transaction.merge({
            amount: payload.amount,
          });
        }
        return transaction;
      });
    case actionTypes.UPDATE_TRANSACTION_CATEGORY:
      return state.map(transaction => {
        if (transaction.get('id') === payload.transactionId) {
          return transaction.merge({
            category: payload.category,
          });
        }
        return transaction;
      });
    case actionTypes.UPDATE_TRANSACTION_NAME:
      return state.map(transaction => {
        if (transaction.get('id') === payload.transactionId) {
          return transaction.merge({
            name: payload.name,
          });
        }
        return transaction;
      });
    case actionTypes.TRANSACTION_ADDED:
      return state.push(Immutable.fromJS(payload));
    case actionTypes.TRANSACTION_UPDATED:
      return state.map(transaction => {
        if (transaction.get('id') === payload.id) {
          return transaction.merge({
            ...payload,
            amount: centsToDollars(payload.amount)
          });
        }
        return transaction;
      });
    default:
      return state;
  }
};
