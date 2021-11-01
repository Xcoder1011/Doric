<template>
  <view class="doric-stack" :style="cssStyle">
    <DoricNode
      v-for="(item, index) in children"
      v-bind:key="item.nativeViewModel.id"
      :doricModelProps="item"
      :style="childStyles[index]"
    />
  </view>
</template>

<script lang="ts">
import { LayoutConfig, LayoutSpec } from "doric";
import Vue from "vue";

import { DoricModel, getChildren, toCSSStyle } from "../../../doric/utils";

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

        let children = getChildren(doricModel);

        let childStyles: Array<String> = [];

        for (let index = 0; index < children.length; index++) {
          const child = children[index];
          let childStyle: Record<string, string> = {};

          childStyle["position"] = "absolute";

          if (child.nativeViewModel.props.layoutConfig) {
            let layoutConfig = child.nativeViewModel.props
              .layoutConfig as LayoutConfig;

            if (layoutConfig.heightSpec == LayoutSpec.MOST) {
              childStyle["height"] = "100%";
            }

            if (layoutConfig.widthSpec == LayoutSpec.MOST) {
              childStyle["width"] = "100%";
            }
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
.doric-stack {
  position: relative;
  overflow: hidden;
}
</style>
