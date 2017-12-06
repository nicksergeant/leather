import actionTypes from '../actions/actionTypes';

export const accountAdded = payload => {
  return {
    payload,
    type: actionTypes.ACCOUNT_ADDED,
  };
};

export const accountDeleted = payload => {
  return {
    payload,
    type: actionTypes.ACCOUNT_DELETED,
  };
};

export const accountUpdated = payload => {
  return {
    payload,
    type: actionTypes.ACCOUNT_UPDATED,
  };
};

export const addAccount = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.ADD_ACCOUNT_REQUEST });
  channel
    .push('new_account', payload)
    .receive('error', () => {
      dispatch({ type: actionTypes.ADD_ACCOUNT_FAILURE });
    });
};

export const deleteAccount = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.DELETE_ACCOUNT_REQUEST });
  channel
    .push('delete_account', payload)
    .receive('error', () => {
      dispatch({ type: actionTypes.DELETE_ACCOUNT_FAILURE });
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
