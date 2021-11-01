<template>
  <image class="doric-image" :src="imageUrl" :style="cssStyle" @load="onload">
  </image>
</template>

<script lang="ts">
import Vue from "vue";

import { Image } from "doric";
import { DoricModel, toCSSStyle } from "../../../doric/utils";

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
          .props as Partial<Image>;
        this.$set(
          this.$data,
          "cssStyle",
          toCSSStyle((newVal as DoricModel).cssStyle)
        );
        this.$set(this.$data, "imageUrl", props.imageUrl);
      },
    },
  },
  data() {
    return {
      cssStyle: null,
      imageUrl: null,
    };
  },

  methods: {
    onload(event: any) {
      const doricStyle = (this.$props.doricModelProps as DoricModel).cssStyle;
      if (doricStyle["width"] === "max-content") {
        doricStyle["width"] = `${event.detail.width}px`;
      }
      if (doricStyle["height"] === "max-content") {
        doricStyle["height"] = `${event.detail.height}px`;
      }

      const cssStyle = Object.entries(doricStyle)
        .map((e) => `${e[0]}:${e[1]}`)
        .join(";");
      this.$set(this.$data, "cssStyle", cssStyle);
    },
  },
});
</script>

<style>
.doric-image {
}
</style>
