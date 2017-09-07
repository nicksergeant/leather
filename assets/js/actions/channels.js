import actionTypes from '../actions/actionTypes';
import socket from '../data/socket';

export const initChannel = name => {
  return {
    payload: {
      channel: socket.channel(name, {}),
      name,
    },
    type: actionTypes.INIT_CHANNEL,
  };
};
