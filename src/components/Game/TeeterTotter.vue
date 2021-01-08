<template>
  <div>
    TeeterTotter
    <div
      class="seasaw"
      :style="{transform: `rotate(${this.sesawAngle}deg)`}"
    />
    <div class="pivot" />
  </div>
</template>

<script>
export default {
  computed: {
    sesawAngle () {
      return 10
    }
  },
}
</script>

<style lang="scss" scoped>
.pivot {
  border-radius: 2px;
  border-bottom: 120px solid gray;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  width: 0;
  height: 0;
  margin: auto;
}
.seasaw {
  height: 5px;
  width: 100%;
  background-color: red;
  transition: 500ms ease-in;
  position: relative;
}
</style>