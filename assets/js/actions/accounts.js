import actionTypes from '../actions/actionTypes';

export const addAccount = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.ADD_ACCOUNT_REQUEST });
  channel
    .push('new_account', payload)
    .receive('ok', response => {
      dispatch({
        response,
        type: actionTypes.ADD_ACCOUNT_SUCCESS,
      });
    })
    .receive('error', () => {
      dispatch({ type: actionTypes.ADD_ACCOUNT_FAILURE });
    });
};

export const setAccounts = payload => {
  return {
    payload,
    type: actionTypes.SET_ACCOUNTS,
  };
};

export const setActiveAccount = payload => {
  return {
    payload,
    type: actionTypes.SET_ACTIVE_ACCOUNT,
  };
};
