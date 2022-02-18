import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Web3 from '@/plugins/web3'

import App from './App.vue'
import router from './router'
import store from '@/store'
import Clipboard from "v-clipboard"


Vue.use(Clipboard);
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Web3)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
