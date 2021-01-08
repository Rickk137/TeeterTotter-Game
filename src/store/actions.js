import { randomColorGenerator, randomNumberGenerator } from '../utils';
import { SHAPES } from '../config';

const actions = {
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

    dispatch('createItem', 'right');
    dispatch('createItem', 'right');
  },
};

export default actions;
