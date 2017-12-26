import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';
import moment from 'moment';
import { centsToDollars } from '../data/utils';

export const transactions = (state = Immutable.List(), { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TRANSACTIONS:
      payload = payload.map(transaction => {
        return {
          ...transaction,
          amount: centsToDollars(transaction.amount),
          dateObj: moment(transaction.date),
        };
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
    case actionTypes.UPDATE_TRANSACTION_DATE:
      return state.map(transaction => {
        if (transaction.get('id') === payload.transactionId) {
          return transaction.merge({
            date: payload.date,
            dateObj: moment(payload.date),
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
      return state.push(
        Immutable.fromJS({
          ...payload,
          amount: centsToDollars(payload.amount),
          dateObj: moment(payload.date),
        })
      );
    case actionTypes.TRANSACTION_DELETED:
      return state.filter(transaction => {
        return transaction.get('id') !== payload.id;
      });
    case actionTypes.TRANSACTION_UPDATED:
      return state.map(transaction => {
        if (transaction.get('id') === payload.id) {
          return transaction.merge({
            ...payload,
            amount: centsToDollars(payload.amount),
            dateObj: moment(payload.date),
          });
        }
        return transaction;
      });
    default:
      return state;
  }
};
