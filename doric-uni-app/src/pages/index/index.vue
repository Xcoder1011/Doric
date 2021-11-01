<template>
  <view class="doric-container">
    <DoricNode :doricModelProps="doricModel"></DoricNode>
  </view>
</template>

<script lang="ts">
import Vue from "vue";

import { ClassType, Panel, uniqueId } from "doric";
import { callEntityMethod, createContext } from "../../doric/context";
import { DoricModel } from "../../doric/utils";
import { Modal } from "../../doric/plugin/modal";

import { HelloDoric } from "../../demo/HelloDoric";
import { SnakePanel } from "../../demo/Snake";
import { LayoutDemo } from "../../demo/LayoutDemo";
import { Gobang } from "../../demo/Gobang";

let global = new Function("return this")();

export default Vue.extend({
  data() {
    return {
      doricModel: null,
    };
  },
  onLoad(option: AnyObject) {
    let name = option.name;

    const contextId = uniqueId("context");

    let classType: ClassType<Panel>;
    if (name == "HelloDoric") {
      classType = HelloDoric;
    } else if (name == "Snake") {
      classType = SnakePanel;
    } else if (name == "LayoutDemo") {
      classType = LayoutDemo;
    } else if (name == "Gobang") {
      classType = Gobang;
    }
    const context = createContext(contextId, classType!!);

    const panel = context.entity;

    global.context = context;

    context.plugins.set("modal", new Modal(context));

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
