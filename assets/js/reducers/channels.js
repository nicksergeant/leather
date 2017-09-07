import Immutable from 'immutable';
import actionTypes from '../actions/actionTypes';

export const selectAllChannels = state => state.channels;

export const getChannelByName = (state, name) => {
  return selectAllChannels(state).get(name);
};

export const channels = (state = Immutable.Map(), { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_CHANNEL:
      return state.set(payload.name, payload.channel);
    default:
      return state;
  }
};
