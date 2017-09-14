import actionTypes from '../actions/actionTypes';

export const activePanel = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ACTIVE_PANEL:
      return payload;
    default:
      return state;
  }
};
