<template>
  <div id="falling-wrapper">
    <Item
      v-for="item in fallingItems"
      :id="'item-'+item.id"
      :key="item.id"
      :item="item"
      :onBoard="false"
      class="falling-item"
    />
  </div>
</template>

<script>

import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import Item from "./Item";
import MUTATION_TYPES from '../../store/mutation-types';

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
  beforeDestroy () {
    window.removeEventListener('keydown', this.moveItem);
    clearInterval(this.fallingIntervalId);
  },
  watch: {
    status (newValue) {
      if (newValue === 'play') {
        window.addEventListener('keydown', this.moveItem);
        this.startFalling();
      } else {
        clearInterval(this.fallingIntervalId);
        window.removeEventListener('keydown', this.moveItem);
      }
    }
  },
  computed: {
    ...mapState(['fallingItems', 'status', 'dropSpeed']),
    ...mapGetters(['sesawAngle']),
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
    ...mapActions(['hitTheSeasaw']),
    ...mapMutations({
      move: MUTATION_TYPES.MOVE_ITEM,
    }),
    ...mapMutations([MUTATION_TYPES.SET_DROP_SPEED]),
    nextItem () {
      const fallingItem = this.fallingItemEl.getBoundingClientRect();
      const fallingWrapper = this.fallingWrapperEl.getBoundingClientRect();
      const newLeft = ((fallingItem.left - fallingWrapper.left - Math.tan(this.sesawAngle * Math.PI / 180) * fallingItem.width) * 100) / fallingWrapper.width;

      this.fallingItemTop = 0;

      this.setDropSpeed(this.dropSpeed + 1);
      this.hitTheSeasaw(newLeft);
      this.startFalling();
      this.calcBottomLimit();
    },
    calcBottomLimit () {
      const fallingItem = this.fallingItemEl.getBoundingClientRect();
      const fallingWrapper = this.fallingWrapperEl.getBoundingClientRect();

      const b = fallingWrapper.width / 2 - (fallingItem.left - fallingWrapper.left);

      const a = Math.tan(this.sesawAngle * Math.PI / 180) * b;

      this.topLimit = fallingWrapper.height - a - fallingItem.height;
    },
    startFalling () {
      if (this.fallingIntervalId) clearInterval(this.fallingIntervalId)

      this.fallingIntervalId = setInterval(() => {
        if (this.fallingItemTop > this.topLimit) {
          clearInterval(this.fallingIntervalId);
          this.fallingIntervalId = null;
          this.nextItem();
        }
        else {
          this.fallingItemTop += 1;
          this.fallingItemEl.style.top = `${this.fallingItemTop}px`;
        }
      }, 20 / this.dropSpeed)
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
      // this.$store.commit('MOVE_ITEM', amount);
      this.move(amount)
    }
  },
}
</script>

<style lang="scss" scoped>
#falling-wrapper {
  height: 50vh;
  position: relative;
}
.falling-item {
  z-index: 1;
}
</style>