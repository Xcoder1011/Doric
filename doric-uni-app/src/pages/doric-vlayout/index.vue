<template>
  <view class="doric-vlayout" :style="cssStyle">
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

import { VLayout } from "doric";
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
        const props = nativeViewModel.props as Partial<VLayout>;
        const doricStyle = doricModel.cssStyle;

        let childStyle = {} as Record<string, string>;
        childStyle["flex-shrink"] = "0";
        if (props.layoutConfig?.weight) {
          childStyle["flex"] = `${props.layoutConfig?.weight}`;
        }

        if (props.space) {
          let space = props.space;
          childStyle["margin-bottom"] = `${space}px;`;
        }

        if (props.gravity) {
          let gravity = props.gravity as unknown as number;
          if ((gravity & LEFT) === LEFT) {
            doricStyle["align-items"] = "flex-start";
          } else if ((gravity & RIGHT) === RIGHT) {
            doricStyle["align-items"] = "flex-end";
          } else if ((gravity & CENTER_X) === CENTER_X) {
            doricStyle["align-items"] = "center";
          }
          if ((gravity & TOP) === TOP) {
            doricStyle["justify-content"] = "flex-start";
          } else if ((gravity & BOTTOM) === BOTTOM) {
            doricStyle["justify-content"] = "flex-end";
          } else if ((gravity & CENTER_Y) === CENTER_Y) {
            doricStyle["justify-content"] = "center";
          }
        }

        const cssStyle = Object.entries(doricStyle)
          .map((e) => `${e[0]}:${e[1]}`)
          .join(";");
        this.$set(this.$data, "cssStyle", cssStyle);
        this.$set(this.$data, "children", getChildren(doricModel));

        let childStyleString = Object.entries(childStyle)
          .map((e) => `${e[0]}:${e[1]}`)
          .join(";");
        console.log(childStyleString);

        this.$set(this.$data, "style", childStyleString);
      },
    },
  },
  data() {
    return {
      style: null,
      children: null,
      cssStyle: null,
    };
  },
  methods: {},
});
</script>

<style>
.doric-vlayout {
  display: flex;
  flex-direction: column;
}
</style>
