import actionTypes from '../actions/actionTypes';
import socket from '../data/socket';

export const linkExchangeToken = (
  channel,
  public_token,
  metadata
) => dispatch => {
  dispatch({ type: actionTypes.LINK_EXCHANGE_TOKEN_REQUEST });
  channel
    .push('link_exchange_token', { public_token, metadata })
    .receive('error', () => {
      dispatch({ type: actionTypes.LINK_EXCHANGE_TOKEN_FAILURE });
    });
};
