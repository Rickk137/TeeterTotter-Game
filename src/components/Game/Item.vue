<template>
  <div :class="'layout-h layout-center-center item ' +  shape">
    <span class="weight">
      {{item.weight + 'kg'}}
    </span>
  </div>
</template>

<script>
import { SHAPES } from "../../config";

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    rightItem: {
      type: Boolean,
      default: false
    },
    onBoard: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    shape () {
      return SHAPES[this.item.shape]
    }
  },
  mounted () {
    this.setItemColor();

    this.updateItemPosition(this.item.left);
  },
  watch: {
    'item.left' (newVal) {
      this.updateItemPosition(newVal);
    }
  },
  methods: {
    updateItemPosition (left) {
      const { width } = this.$el.getBoundingClientRect();
      const start = this.rightItem ? 50 : 0;

      this.$el.style.left = (this.rightItem && left > 25)
        ? `calc(${start + left}% - ${width}px)`
        : `${start + left}%`;
    },
    setItemColor () {
      const { color } = this.item;

      if (this.shape === 'triangle') {
        this.$el.style.borderBottomColor = color;
      }
      else {
        this.$el.style.backgroundColor = color;
      }
      if (this.onBoard) {
        this.$el.style.transform += 'translateY(-100%)';
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.item {
  position: absolute;
  .weight {
    color: white;
    font-size: 20px;
  }

  &.circle {
    border-radius: 50%;
  }
  &.square {
    border-radius: 3px;
  }
  &.square,
  &.circle {
    width: 60px;
    height: 60px;
  }

  &.triangle {
    width: 0;
    height: 0;
    border-bottom: 60px solid;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;

    .weight {
      margin: auto;
      position: absolute;
      top: 30px;
    }
  }
}
</style>