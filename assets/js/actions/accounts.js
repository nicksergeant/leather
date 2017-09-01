import actionTypes from '../actions/actionTypes';

export const addAccount = payload => {
  return {
    payload,
    type: actionTypes.ADD_ACCOUNT,
  };
};

export const setActiveAccount = payload => {
  return {
    payload,
    type: actionTypes.SET_ACTIVE_ACCOUNT,
  };
};
