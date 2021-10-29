<template>
  <view class="doric-container">
    <DoricNode :doricModelProps="doricModel"></DoricNode>
  </view>
</template>

<script lang="ts">
import Vue from "vue";

import { uniqueId } from "doric";
import { callEntityMethod, createContext } from "../../doric/context";
import { HelloDoric } from "../../doric/HelloDoric";
import { SnakePanel } from "../../doric/Snake";
import { LayoutDemo } from "../../doric/LayoutDemo";
import { DoricModel } from "../../doric/utils";

const contextId = uniqueId("context");
const context = createContext(contextId, SnakePanel);
const panel = context.entity;

export default Vue.extend({
  data() {
    return {
      doricModel: null,
    };
  },
  onLoad() {
    context.hookAfter = () => {
      console.log("hookAfter", panel.getRootView().toModel());
      this.$set(this.$data, "doricModel", {
        contextId,
        nativeViewModel: panel.getRootView().toModel(),
        cssStyle: {},
        idList: [panel.getRootView().viewId],
      } as DoricModel);
      callEntityMethod(context.id, "__onCreate__");
    };
  },
  onReady() {
    uni
      .createSelectorQuery()
      .select(".doric-container")
      .fields(
        {
          size: true,
        },
        (data) => {
          callEntityMethod(context.id, "__build__", {
            width: data.width,
            height: data.height,
          });
        }
      )
      .exec();
  },
  onShow() {
    callEntityMethod(context.id, "__onShow__");
  },
  onHide() {
    callEntityMethod(context.id, "__onHidden__");
  },
  onUnload() {
    callEntityMethod(context.id, "__onDestroy__");
  },
  methods: {},
});
</script>

<style>
body {
  width: 100%;
  height: 100%;
}

.doric-container {
  width: 100%;
  height: 100%;
}
</style>
