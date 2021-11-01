<template>
  <view class="doric-hlayout" :style="cssStyle">
    <DoricNode
      v-for="(item, index) in children"
      v-bind:key="item.nativeViewModel.id"
      :doricModelProps="item"
      :style="childStyles[index]"
    />
  </view>
</template>

<script lang="ts">
import Vue from "vue";

import { HLayout, LayoutConfig, LayoutSpec } from "doric";
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
        let children = getChildren(doricModel);

        let childStyles: Array<String> = [];

        for (let index = 0; index < children.length; index++) {
          const child = children[index];
          let childStyle: Record<string, string> = {};

          childStyle["flex-shrink"] = "0";
          if (child.nativeViewModel.props.layoutConfig) {
            let layoutConfig = child.nativeViewModel.props
              .layoutConfig as LayoutConfig;

            if (layoutConfig.heightSpec == LayoutSpec.MOST) {
              childStyle["height"] = "100%";
            }

            if (layoutConfig.weight) {
              childStyle["flex"] = `${layoutConfig?.weight}`;
              layoutConfig.widthSpec = LayoutSpec.MOST;
            }
          }
          if (props.space && index != children.length - 1) {
            let space = props.space;
            childStyle["margin-right"] = `${space}px;`;
          }

          let childStyleString = Object.entries(childStyle)
            .map((e) => `${e[0]}:${e[1]}`)
            .join(";");
          childStyles.push(childStyleString);
        }

        this.$set(this.$data, "children", children);
        this.$set(this.$data, "childStyles", childStyles);
      },
    },
  },
  data() {
    return {
      children: null,
      cssStyle: null,
      childStyles: null,
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
