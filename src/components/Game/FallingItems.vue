<template>
  <div id="falling-wrapper">
    <Item
      v-for="item in fallingItems"
      :id="'item-'+item.id"
      :key="item.id"
      :item="item"
      :onBoard="false"
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

      topLimit: 0
    }
  },
  mounted () {
    window.addEventListener('keydown', this.moveItem);
    this.sesaw = document.getElementById('seasaw');
    this.startFalling();
    this.calcBottomLimit();

  },
  destroyed () {
    window.removeEventListener('keydown', this.moveItem);
    clearInterval(this.fallingIntervalId);
  },
  computed: {
    ...mapState(['fallingItems', 'sesawAngle']),
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
    },
    sesawEl () {
      return document.getElementById('seasaw');
    },

  },
  methods: {
    calcBottomLimit () {
      const fallingItem = this.fallingItemEl.getBoundingClientRect();
      const fallingWrapper = this.fallingWrapperEl.getBoundingClientRect();

      const b = fallingWrapper.width / 2 - (fallingItem.left - fallingWrapper.left);

      const a = Math.tan(this.sesawAngle * Math.PI / 180) * b;

      this.topLimit = fallingWrapper.height - a - fallingItem.height;
    },
    startFalling () {
      this.fallingIntervalId = setInterval(() => {
        if (this.fallingItemTop > this.topLimit) {
          this.x = 1;
        }
        else {
          this.fallingItemTop += 1;
          this.fallingItemEl.style.top = `${this.fallingItemTop}px`;
        }
      }, 10)
    },
    moveItem (e) {
      if (e.keyCode !== 39 && e.keyCode !== 37)
        return;

      const { left } = this.fallingItem;
      const wrapperWidth = this.fallingWrapperEl.getBoundingClientRect().width;
      const itemWidth = this.fallingItemEl.getBoundingClientRect().width;
      const fraction = itemWidth / wrapperWidth * 100;

      if (e.keyCode === 39 && (left + fraction) > 49) return;
      if (e.keyCode === 37 && left < 1) return;

      this.calcBottomLimit();

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
  position: relative;
}
</style>