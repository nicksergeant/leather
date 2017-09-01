import { Socket } from 'phoenix';

const socket = new Socket('/socket', {
  params: { token: window.userToken },
  logger: (kind, msg, data) => {
    console.log(`${kind}: ${msg}`, data);
  },
});

socket.connect();

export default socket;
