<template>
  <div class="doric-text" :style="cssStyle">
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Text } from "doric";

import {
  LEFT,
  RIGHT,
  CENTER_X,
  CENTER_Y,
  BOTTOM,
  TOP,
  DoricModel,
  toCSSStyle,
  toPixelString,
  toRGBAString,
} from "../../../doric/utils";

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
        const props = (newVal as DoricModel).nativeViewModel
          .props as Partial<Text>;
        const doricStyle = (newVal as DoricModel).cssStyle;
        if (props.textSize) {
          doricStyle["font-size"] = toPixelString(props.textSize);
        }
        if (props.textColor) {
          doricStyle["color"] = toRGBAString(
            props.textColor as unknown as number
          );
        }
        if (props.textAlignment) {
          const gravity = props.textAlignment as unknown as number;
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
        this.$set(this.$data, "cssStyle", toCSSStyle(doricStyle));
        this.$set(this.$data, "text", props.text);
      },
    },
  },

  data() {
    return {
      cssStyle: null,
      text: null,
    };
  },

  methods: {},
});
</script>

<style>
.doric-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
