import { randomColorGenerator, randomNumberGenerator } from '../utils';
import { SHAPES } from '../config';
import MUTATION_TYPES from './mutation-types';

const actions = {
  hitTheSeasaw({ state, commit, dispatch }, newLeft) {
    const item = state.fallingItems[0];

    commit(MUTATION_TYPES.ADD_ITEM, {
      item: { ...item, left: newLeft },
      position: 'left',
    });
    commit(MUTATION_TYPES.REMOVE_FALLING_ITEM);

    dispatch('createItem', 'right');
    dispatch('createItem', 'falling');
  },
  createItem({ state, commit }, position = 'right') {
    const range = position === 'right' ? [10, 45] : [5, 40];
    const weight = randomNumberGenerator(1, 10);
    const left = randomNumberGenerator(range[0], range[1]);
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

    commit(MUTATION_TYPES.ADD_ITEM, { item, position });
  },

  startGame({ dispatch }) {
    dispatch('createItem', 'falling');
    dispatch('createItem', 'falling');
    dispatch('createItem', 'right');
  },

  resetGame({ dispatch, commit }) {
    commit(MUTATION_TYPES.RESET);

    dispatch('createItem', 'falling');
    dispatch('createItem', 'falling');
    dispatch('createItem', 'right');
  },
};

export default actions;
