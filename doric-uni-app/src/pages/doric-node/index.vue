<template>
  <DoricText
    v-if="type === 'Text'"
    :doricModelProps="doricModel"
    @click.native="onclick"
  />
  <DoricImage
    v-else-if="type === 'Image'"
    :doricModelProps="doricModel"
    @click.native="onclick"
  />
  <DoricVLayout
    v-else-if="type === 'VLayout'"
    :doricModelProps="doricModel"
    @click.native="onclick"
  />
  <DoricHLayout
    v-else-if="type === 'HLayout'"
    :doricModelProps="doricModel"
    @click.native="onclick"
  />
  <DoricStack
    v-else-if="type === 'Stack'"
    :doricModelProps="doricModel"
    @click.native="onclick"
  />
  <DoricRoot
    v-else-if="type === 'Root'"
    :doricModelProps="doricModel"
    @click.native="onclick"
  />
  <text v-else>Error:{{ type }}</text>
</template>

<script lang="ts">
import Vue from "vue";

import { LayoutSpec, View } from "doric";
import { toPixelString, toRGBAString, DoricModel } from "../../doric/utils";
import { callResponse } from "../../doric/context";

import DoricText from "../doric-text/index.vue";
import DoricImage from "../doric-image/index.vue";
import DoricVLayout from "../doric-vlayout/index.vue";
import DoricHLayout from "../doric-hlayout/index.vue";
import DoricStack from "../doric-stack/index.vue";
import DoricRoot from "../doric-root/index.vue";

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
        if (!newVal) return;
        const doricModel = newVal as DoricModel;
        const props = doricModel.nativeViewModel.props as Partial<View>;
        const doricStyle: Record<string, string> = doricModel.cssStyle;

        if (props.layoutConfig) {
          doricStyle["margin-left"] = toPixelString(
            props.layoutConfig.margin?.left || 0
          );
          doricStyle["margin-right"] = toPixelString(
            props.layoutConfig.margin?.right || 0
          );
          doricStyle["margin-top"] = toPixelString(
            props.layoutConfig.margin?.top || 0
          );
          doricStyle["margin-bottom"] = toPixelString(
            props.layoutConfig?.margin?.bottom || 0
          );
        }
        if (props.border) {
          doricStyle["border-style"] = "solid";
          doricStyle["border-width"] = toPixelString(props.border.width);
          doricStyle["border-color"] = toRGBAString(
            props.border.color as unknown as number
          );
        }
        if (props.padding) {
          doricStyle["padding-left"] = toPixelString(props.padding.left || 0);
          doricStyle["padding-right"] = toPixelString(props.padding.right || 0);
          doricStyle["padding-top"] = toPixelString(props.padding.top || 0);
          doricStyle["padding-bottom"] = toPixelString(
            props.padding.bottom || 0
          );
        }
        let width: string;
        const widthSpec = props.layoutConfig?.widthSpec || LayoutSpec.JUST;
        switch (widthSpec) {
          case LayoutSpec.FIT:
            width = "max-content";
            break;
          case LayoutSpec.MOST:
            width = "100%";
            break;
          case LayoutSpec.JUST:
          default:
            width = toPixelString(
              (props.width || 0) -
                (props.padding?.left || 0) -
                (props.padding?.right || 0) -
                (props.border?.width || 0) * 2
            );
            break;
        }
        doricStyle["width"] = width;
        let height: string;
        const heightSpec = props.layoutConfig?.heightSpec || LayoutSpec.JUST;
        switch (heightSpec) {
          case LayoutSpec.FIT:
            height = "max-content";
            break;
          case LayoutSpec.MOST:
            height = "100%";
            break;
          case LayoutSpec.JUST:
          default:
            height = toPixelString(
              (props.height || 0) -
                (props.padding?.top || 0) -
                (props.padding?.bottom || 0) -
                (props.border?.width || 0) * 2
            );
            break;
        }
        doricStyle["height"] = height;

        if (props.backgroundColor !== undefined) {
          doricStyle["background-color"] = toRGBAString(
            props.backgroundColor as unknown as number
          );
        }
        doricModel.cssStyle = doricStyle;
        this.$set(this.$data, "doricModel", doricModel);
        this.$set(this.$data, "type", doricModel.nativeViewModel.type);
      },
    },
  },
  data() {
    return {
      doricModel: null,
      type: null,
    };
  },
  methods: {
    onclick: function (event: Event) {
      const doricModel = this.$props.doricModelProps as DoricModel;
      const props = doricModel.nativeViewModel.props as Partial<View>;
      if ((doricModel.idList, props.onClick)) {
        callResponse(
          doricModel.contextId,
          doricModel.idList,
          props.onClick as unknown as string
        );
      }
    },
  },
  components: {
    DoricText: DoricText,
    DoricImage: DoricImage,
    DoricHLayout: DoricHLayout,
    DoricVLayout: DoricVLayout,
    DoricStack: DoricStack,
    DoricRoot: DoricRoot,
  },
});
</script>

<style>
.doric-node {
}
</style>
