<template>
  <div class="layout-h layout-center layout-around-justified">
    <div>
      Total Weight: {{leftTotalSum}}
    </div>
    <div>
      Total Weight: {{rightTotalSum}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {

    ...mapGetters(['leftTotalSum', 'rightTotalSum'])
  },

}
</script>

<style lang="scss" scoped>
</style>