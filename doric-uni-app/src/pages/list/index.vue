<template>
  <view class="demo-container">
    <text class="cell" @click="click('Gobang')">Gobang</text>
    <text class="cell" @click="click('HelloDoric')">HelloDoric</text>
    <text class="cell" @click="click('LayoutDemo')">LayoutDemo</text>
    <text class="cell" @click="click('Snake')">Snake</text>
  </view>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    click(name: string) {
      console.log(name);
      uni.navigateTo({
        url: "/pages/index/index?name=" + name,
      });
    },
  },
});
</script>

<style>
body {
  width: 100%;
  height: 100%;
}

.demo-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cell {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: #eee;
  border-width: 1px;
}
</style>
