<template>
  <div>
    <button
      @click="toggleGameStatus"
      class="btn primary"
    >
      <span>{{ buttonLabel }}</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MUTATION_TYPES from '../../store/mutation-types';

export default {
  computed: {
    ...mapState(['status']),
    buttonLabel () {
      return this.status === 'pause' ? 'play' : 'pause'
    }
  },
  methods: {
    ...mapMutations([MUTATION_TYPES.SET_GAME_STATUS]),
    toggleGameStatus () {
      this.setGameStatus(this.buttonLabel)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>