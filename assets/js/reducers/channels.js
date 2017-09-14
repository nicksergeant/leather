import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const channels = (state = Immutable.Map(), { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_CHANNEL:
      return state.set(payload.name, payload.channel);
    default:
      return state;
  }
};
