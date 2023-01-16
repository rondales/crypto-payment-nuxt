import Vue from 'vue'
import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"
import IgnoreList from './ignore.js'

export default {
  init: function(vueRouter) {
    if (process.env.VUE_APP_SENTRY_DSN !== '') {
      Sentry.init({
        Vue,
        dsn: process.env.VUE_APP_SENTRY_DSN,
        integrations: [
          new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(vueRouter),
            tracingOrigins: ['localhost', /^\//],
          })
        ],
        tracesSampleRate: 1.0,
        ignoreErrors: IgnoreList
      })
    }
  }
}