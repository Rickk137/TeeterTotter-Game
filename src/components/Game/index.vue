<template>
  <div class="game layout-v ">
    <div style="height: 500px;background: #eaeaea;">fall</div>
    <TeeterTotter />
  </div>
</template>

<script>
import TeeterTotter from "./TeeterTotter"
export default {
  components: {
    TeeterTotter,
  },
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