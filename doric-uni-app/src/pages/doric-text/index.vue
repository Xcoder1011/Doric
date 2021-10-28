<template>
  <text class="doric-text" :style="cssStyle"> {{ text }}</text>
</template>

<script lang="ts">
import Vue from "vue";

import { Text } from "doric";
import {
  DoricModel,
  toCSSStyle,
  toPixelString,
  toRGBAString,
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
}
</style>
