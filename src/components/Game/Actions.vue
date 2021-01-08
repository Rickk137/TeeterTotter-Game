<template>
  <div>
    <button
      @click="toggleGameStatus"
      class="btn primary"
      :disabled="status === 'end'"
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
      return this.status === 'pause' ? 'continue' : 'pause'
    }
  },
  methods: {
    ...mapMutations([MUTATION_TYPES.SET_GAME_STATUS]),
    toggleGameStatus () {
      this.setGameStatus(this.status === 'pause' ? 'play' : 'pause'
      )
    }
  },
}
</script>

<style lang="scss" scoped>
</style>