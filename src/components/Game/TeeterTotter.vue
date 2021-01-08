<template>
  <div>
    <div
      id="seasaw"
      :style="{transform: `rotate(${this.sesawAngle}deg)`}"
    >
      <Item
        v-for="item in rightItems"
        :key="item.id"
        :item="item"
        :rightItem="true"
      />

      <Item
        v-for="item in leftItems"
        :key="item.id"
        :item="item"
      />
    </div>
    <div class="pivot" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Item from "./Item";

export default {
  components: {
    Item,
  },
  computed: {
    ...mapState(['rightItems', 'leftItems']),
    ...mapGetters(['sesawAngle'])
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
#seasaw {
  height: 5px;
  width: 100%;
  background-color: red;
  transition: 500ms ease-in;
  position: relative;
}
</style>