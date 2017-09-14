import actionTypes from '../actions/actionTypes';

export const setActivePanel = payload => {
  return {
    payload,
    type: actionTypes.SET_ACTIVE_PANEL,
  };
};
