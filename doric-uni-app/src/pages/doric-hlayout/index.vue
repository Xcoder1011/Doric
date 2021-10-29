<template>
  <view class="doric-hlayout" :style="cssStyle">
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

import { HLayout } from "doric";
import {
  LEFT,
  RIGHT,
  CENTER_X,
  CENTER_Y,
  BOTTOM,
  TOP,
  getChildren,
  DoricModel,
} from "../../doric/utils";

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
        const nativeViewModel = doricModel.nativeViewModel;
        const props = nativeViewModel.props as Partial<HLayout>;
        const doricStyle = doricModel.cssStyle;

        if (props.space) {
          let space = props.space;
          this.$set(this.$data, "style", `margin-right: ${space}px;`);
        }
        if (props.gravity) {
          let gravity = props.gravity as unknown as number;
          if ((gravity & LEFT) === LEFT) {
            doricStyle["justify-content"] = "flex-start";
          } else if ((gravity & RIGHT) === RIGHT) {
            doricStyle["justify-content"] = "flex-end";
          } else if ((gravity & CENTER_X) === CENTER_X) {
            doricStyle["justify-content"] = "center";
          }
          if ((gravity & TOP) === TOP) {
            doricStyle["align-items"] = "flex-start";
          } else if ((gravity & BOTTOM) === BOTTOM) {
            doricStyle["align-items"] = "flex-end";
          } else if ((gravity & CENTER_Y) === CENTER_Y) {
            doricStyle["align-items"] = "center";
          }
        }

        const cssStyle = Object.entries(doricStyle)
          .map((e) => `${e[0]}:${e[1]}`)
          .join(";");
        this.$set(this.$data, "cssStyle", cssStyle);
        this.$set(this.$data, "children", getChildren(doricModel));
      },
    },
  },
  data() {
    return {
      children: null,
      cssStyle: null,
      style: null,
    };
  },

  methods: {},
});
</script>

<style>
.doric-hlayout {
  display: flex;
  flex-direction: row;
}
</style>
