const mutations = {
  MOVE_ITEM(state, amount) {
    state.fallingItems[0].left += amount;
  },
  ADD_ITEM(state, { item, position }) {
    if (position === 'falling') state.fallingItems.push(item);
    else if (position === 'left') state.leftItems.push(item);
    else state.rightItems.push(item);
  },
  REMOVE_FALLING_ITEM(state) {
    state.fallingItems.shift();
  },
};

export default mutations;
