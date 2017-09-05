import actionTypes from '../actions/actionTypes';

export const addAccount = (channel, payload) => dispatch => {
  dispatch({ type: actionTypes.ADD_ACCOUNT_REQUEST });
  dispatch({
    payload,
    type: actionTypes.ADD_ACCOUNT_SUCCESS,
  });
};

export const setActiveAccount = payload => {
  return {
    payload,
    type: actionTypes.SET_ACTIVE_ACCOUNT,
  };
};
