import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const accounts = (
  state = Immutable.List(),
  { type, payload, response }
) => {
  switch (type) {
    case actionTypes.ADD_ACCOUNT_SUCCESS:
      return state.push(Immutable.fromJS(response));
    case actionTypes.SET_ACCOUNTS:
      return Immutable.fromJS(payload);
    default:
      return state;
  }
};

export const activeAccount = (state = null, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ACTIVE_ACCOUNT:
      return payload;
    default:
      return state;
  }
};
