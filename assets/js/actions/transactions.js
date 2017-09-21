import actionTypes from '../actions/actionTypes';

export const addTransaction = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.ADD_TRANSACTION_REQUEST });
  channel
    .push('new_transaction', payload)
    .receive('ok', response => {
      dispatch({
        response,
        type: actionTypes.ADD_TRANSACTION_SUCCESS,
      });
    })
    .receive('error', () => {
      dispatch({ type: actionTypes.ADD_TRANSACTION_FAILURE });
    });
};

export const addTransactions = payload => {
  return {
    payload,
    type: actionTypes.ADD_TRANSACTIONS,
  };
};

export const updateTransactionAmount = payload => {
  return {
    payload,
    type: actionTypes.UPDATE_TRANSACTION_AMOUNT,
  };
};

export const updateTransactionName = payload => {
  return {
    payload,
    type: actionTypes.UPDATE_TRANSACTION_NAME,
  };
};

export const saveTransaction = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.SAVE_TRANSACTION_REQUEST });
  channel
    .push('update_transaction', payload)
    .receive('ok', response => {
      dispatch({
        response,
        type: actionTypes.SAVE_TRANSACTION_SUCCESS,
      });
    })
    .receive('error', () => {
      dispatch({ type: actionTypes.SAVE_TRANSACTION_FAILURE });
    });
};
