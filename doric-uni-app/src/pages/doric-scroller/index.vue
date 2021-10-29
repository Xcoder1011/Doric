<template>
  <view class="doric-scroller" :style="cssStyle">
    <DoricNode
      v-for="(item, index) in children"
      v-bind:key="item.nativeViewModel.id"
      :doricModelProps="item"
      :style="index == children.length - 1 ? null : style"
    />
  </view>
</template>

<script lang="ts">
import Vue from "vue";

import { DoricModel, getChildren, toCSSStyle } from "../../doric/utils";

export default Vue.extend({
  props: {
    doricModelProps: {
      type: Object,
    },
  },
  watch: {
    doricModelProps: {
      immediate: true,
      handler(newVal) {
        const doricModel = newVal as DoricModel;
        this.$set(this.$data, "cssStyle", toCSSStyle(doricModel.cssStyle));
        this.$set(this.$data, "children", getChildren(doricModel));
      },
    },
  },
  data() {
    return {
      children: null,
      cssStyle: null,
    };
  },

  methods: {},
});
</script>

<style>
.doric-scroller {
}
</style>
