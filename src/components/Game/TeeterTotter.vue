<template>
  <div>
    <div
      id="seasaw"
      :style="seasawStyle"
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
    <div class="pivot">
      <span class="angle">
        {{Math.floor(sesawAngle) + '°'}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Item from "./Item";
import MUTATION_TYPES from '../../store/mutation-types';

export default {
  components: {
    Item,
  },
  computed: {
    ...mapState(['rightItems', 'leftItems']),
    ...mapGetters(['sesawAngle']),
    seasawStyle () {
      return {
        transform: `rotate(${this.sesawAngle}deg)`,
        transitionDuration: `${2500 / (Math.abs(this.sesawAngle) + 1)}ms`
      }
    }
  },
  methods: {
    ...mapMutations([MUTATION_TYPES.SET_GAME_STATUS]),
  },
  watch: {
    sesawAngle (newValue) {
      console.log('newVa;:', newValue)
      if (Math.abs(newValue) > 30)
        this.setGameStatus('end')
    }
  },
}
</script>
 
<style lang="scss" scoped>
.pivot {
  border-radius: 2px;
  border-bottom: 120px solid gray;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  width: 0;
  height: 0;
  margin: auto;
  position: relative;
  .angle {
    position: absolute;
    top: 60px;
    left: -60px;
    width: 120px;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    color: white;
  }
}
#seasaw {
  height: 5px;
  width: 100%;
  background-color: red;
  transition: 500ms ease-in;
  position: relative;
}
</style>