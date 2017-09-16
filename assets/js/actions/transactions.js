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
