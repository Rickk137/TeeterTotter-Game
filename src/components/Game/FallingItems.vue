<template>
  <div
    id="falling-wrapper"
    class="p-relative"
  >
    <Item
      v-for="item in fallingItems"
      :id="'item-'+item.id"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>

import { mapState } from 'vuex';
import Item from "./Item";

export default {
  components: {
    Item,
  },
  data () {
    return {
      sesaw: null,
      fallingItemTop: 0,
      fallingIntervalId: null,

    }
  },
  mounted () {
    window.addEventListener('keydown', this.moveItem);
    this.sesaw = document.getElementById('seasaw');
    // this.startFalling();
  },
  destroyed () {
    window.removeEventListener('keydown', this.moveItem);
    clearInterval(this.fallingIntervalId);
  },
  computed: {
    ...mapState(['fallingItems']),
    fallingItem () {
      return this.fallingItems[0]
    },
    fallingItemEl () {
      if (this.fallingItem)
        return document.getElementById('item-' + this.fallingItems[0].id);
      return null
    },
    fallingWrapperEl () {
      return document.getElementById('falling-wrapper');
    }
  },
  methods: {
    startFalling () {
      this.fallingIntervalId = setInterval(() => {
        this.fallingItemTop += 1;
        this.fallingItemEl.style.top = `${this.fallingItemTop}px`;
      }, 10)
    },
    moveItem (e) {
      if (!e.keyCode === 39 && !e.keyCode === 37)
        return;

      const { left } = this.fallingItem;
      const wrapperWidth = this.fallingWrapperEl.getBoundingClientRect().width;
      const itemWidth = this.fallingItemEl.getBoundingClientRect().width;
      const fraction = itemWidth / wrapperWidth * 100;

      if (e.keyCode === 39 && (left + fraction) > 49) return;
      if (e.keyCode === 37 && left < 1) return;

      const amount = e.keyCode === 39 ? 1 : -1;
      this.$store.commit('MOVE_ITEM', amount);
    }
  },
}
</script>

<style lang="scss" scoped>
#falling-wrapper {
  height: 50vh;
  background: #eaeaea;
}
</style>