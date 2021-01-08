import { randomColorGenerator, randomNumberGenerator } from '../utils';
import { SHAPES } from '../config';

const actions = {
  hitTheSeasaw({ state, commit, dispatch }, newLeft) {
    const item = state.fallingItems[0];

    commit('ADD_ITEM', { item: { ...item, left: newLeft }, position: 'left' });
    commit('REMOVE_FALLING_ITEM');

    dispatch('createItem', 'right');
    dispatch('createItem', 'falling');
  },
  createItem({ state, commit }, position = 'right') {
    const weight = randomNumberGenerator(1, 10);
    const left = randomNumberGenerator(0, 45);
    const shape = randomNumberGenerator(0, SHAPES.length - 1);
    const color = randomColorGenerator();
    const id =
      state.fallingItems.length +
      state.leftItems.length +
      state.rightItems.length;

    const item = {
      id,
      weight,
      shape,
      left,
      color,
    };

    commit('ADD_ITEM', { item, position });
  },

  startGame({ dispatch }) {
    dispatch('createItem', 'falling');
    dispatch('createItem', 'falling');

    dispatch('createItem', 'right');
    dispatch('createItem', 'right');
  },
};

export default actions;
