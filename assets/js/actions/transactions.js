import actionTypes from '../actions/actionTypes';

export const addTransaction = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.ADD_TRANSACTION_REQUEST });
  channel
    .push('new_transaction', payload)
    .receive('error', () => {
      dispatch({ type: actionTypes.ADD_TRANSACTION_FAILURE });
    });
};

export const addTransactions = payload => {
  // TODO: don't add duplicate transactions, update them instead.
  // This can happen when a channel join() happens after a network
  // reconnection, and the user already has transactions in the
  // store.
  return {
    payload,
    type: actionTypes.ADD_TRANSACTIONS,
  };
};

export const deleteTransaction = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.DELETE_TRANSACTION_REQUEST });
  channel
    .push('delete_transaction', payload)
    .receive('error', () => {
      dispatch({ type: actionTypes.DELETE_TRANSACTION_FAILURE });
    });
};

export const saveTransaction = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.SAVE_TRANSACTION_REQUEST });
  channel
    .push('update_transaction', payload)
    .receive('error', () => {
      dispatch({ type: actionTypes.SAVE_TRANSACTION_FAILURE });
    });
};

export const transactionAdded = payload => {
  return {
    payload,
    type: actionTypes.TRANSACTION_ADDED,
  };
};

export const transactionDeleted = payload => {
  return {
    payload,
    type: actionTypes.TRANSACTION_DELETED,
  };
};

export const transactionUpdated = payload => {
  return {
    payload,
    type: actionTypes.TRANSACTION_UPDATED,
  };
};

export const updateTransactionAmount = payload => {
  return {
    payload,
    type: actionTypes.UPDATE_TRANSACTION_AMOUNT,
  };
};

export const updateTransactionCategory = payload => {
  return {
    payload,
    type: actionTypes.UPDATE_TRANSACTION_CATEGORY,
  };
};

export const updateTransactionDate = payload => {
  return {
    payload,
    type: actionTypes.UPDATE_TRANSACTION_DATE,
  };
};

export const updateTransactionName = payload => {
  return {
    payload,
    type: actionTypes.UPDATE_TRANSACTION_NAME,
  };
};
