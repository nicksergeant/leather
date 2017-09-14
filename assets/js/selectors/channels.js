export const selectAllChannels = state => state.channels;

export const selectChannelByName = (state, name) => {
  return selectAllChannels(state).get(name);
};
