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
import { NativeViewModel } from "doric";
import Vue from "vue";

import { DoricModel, toCSSStyle } from "../../../doric/utils";

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

        let props = doricModel.nativeViewModel.props;
        if (props.content) {
          let subviews = doricModel.nativeViewModel.props
            .subviews as NativeViewModel[];
          console.log(subviews);
          let children = subviews.map((nativeViewModel) => {
            return {
              contextId: doricModel.contextId,
              nativeViewModel: nativeViewModel,
              cssStyle: {},
              idList: [...doricModel.idList, nativeViewModel.id],
            };
          });
          this.$set(this.$data, "children", children);
        }
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
  overflow: scroll;
}
.doric-scroller::-webkit-scrollbar {
  display: none;
}
</style>
