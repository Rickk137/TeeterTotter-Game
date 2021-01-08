<template>
  <div class="game layout-v ">
    <Info />
    <Actions />
    <FallingItems />
    <TeeterTotter />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import TeeterTotter from "./TeeterTotter";
import FallingItems from "./FallingItems";
import Actions from "./Actions";
import Info from "./Info"

export default {
  components: {
    TeeterTotter,
    FallingItems,
    Actions,
    Info
  },
  created () {
    this.startGame();
  },
  methods: {
    ...mapActions(['startGame'])
  }
}
</script>

<style lang="scss" scoped>
.game {
  width: 90vw;
  margin: auto;
  max-width: 1000px;
  min-width: 500px;
}
</style>