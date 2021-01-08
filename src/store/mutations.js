const mutations = {
  ADD_ITEM(state, { item, position }) {
    if (position === 'left') state.leftFallingItems.push(item);
    if (position === 'dropped') state.leftDroppedItems.push(item);
    else state.rightItems.push(item);
  },
};

export default mutations;
