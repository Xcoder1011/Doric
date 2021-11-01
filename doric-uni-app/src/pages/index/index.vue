<template>
  <view class="doric-container">
    <DoricNode :doricModelProps="doricModel"></DoricNode>
  </view>
</template>

<script lang="ts">
import Vue from "vue";

import { uniqueId } from "doric";
import { callEntityMethod, createContext } from "../../doric/context";
import { DoricModel } from "../../doric/utils";

import { HelloDoric } from "../../demo/HelloDoric";
import { SnakePanel } from "../../demo/Snake";
import { LayoutDemo } from "../../demo/LayoutDemo";
import { Gobang } from "../../demo/Gobang";

const contextId = uniqueId("context");
const context = createContext(contextId, Gobang);
const panel = context.entity;

let global = new Function("return this")();
global.nativeBridge = (
  contextId: string,
  namespace: string,
  method: string,
  callbackId?: string,
  args?: any
) => {
  console.log("nativeBridge", contextId);
  console.log("nativeBridge", namespace);
  console.log("nativeBridge", callbackId);
  console.log("nativeBridge", args);
};

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
