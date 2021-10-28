import Vue from 'vue'
import App from './App.vue'

import DoricNode from "./pages/doric-node/index.vue";

Vue.config.productionTip = false
Vue.component('DoricNode', DoricNode)
new App().$mount()
