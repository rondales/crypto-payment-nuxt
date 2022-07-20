import Vue from 'vue'
import Vuex from 'vuex'

import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"

import axios from 'axios'
import VueAxios from 'vue-axios'
import Web3 from '@/plugins/web3'

import App from './App.vue'
import router from './router'
import store from '@/store'
import Clipboard from "v-clipboard"
import VueMeta from 'vue-meta'


Vue.use(Clipboard);
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Web3)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.config.productionTip = false

if (process.env.VUE_APP_SENTRY_DSN !== '') {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', /^\//],
      })
    ],
    tracesSampleRate: 1.0
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
