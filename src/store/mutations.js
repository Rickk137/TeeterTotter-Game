const mutations = {
  moveItem(state, amount) {
    state.fallingItems[0].left += amount;
  },
  addItem(state, { item, position }) {
    if (position === 'falling') state.fallingItems.push(item);
    else if (position === 'left') state.leftItems.push(item);
    else state.rightItems.push(item);
  },
  removeFallingItem(state) {
    state.fallingItems.shift();
  },
  setGameStatus(state, status) {
    state.status = status;
  },
  setDropSpeed(state, speed) {
    state.dropSpeed = speed;
  },
  reset(state) {
    state.fallingItems = [];
    state.leftItems = [];
    state.rightItems = [];
    state.status = 'play';
    state.dropSpeed = 1;
  },
};

export default mutations;
