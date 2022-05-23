import Vue from "vue";
import Router from "vue-router";
import { createRouterLayout } from "vue-router-layout";

Vue.use(Router);

const RouterLayout = createRouterLayout((layout) => {
  return import("@/layouts/" + layout + ".vue");
});

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: RouterLayout,
      children: [
        {
          name: "home",
          path: "/",
          component: () => import("@/pages/index"),
        },
        {
          name: "payment",
          path: "/payment",
          component: () => import("@/pages/payment"),
          meta: { title: 'Slash Payment' },
          children: [
            {
              name: "entrance",
              path: "/payment/:token",
              component: () => import("@/components/organisms/PaymentEntrance"),
              meta: { title: 'Slash Payment' }
            },
            {
              name: "receipt",
              path: "/payment/receipt/:token",
              component: () => import("@/components/organisms/PaymentEmail"),
              meta: { title: 'Slash Payment' }
            },
            {
              name: "wallets",
              path: "/payment/wallets/:token",
              component: () => import("@/components/organisms/PaymentSelectWallets"),
              meta: { title: 'Slash Payment' }
            },
            {
              name: "token",
              path: "/payment/token/:token",
              component: () => import("@/components/organisms/PaymentToken"),
              meta: { title: 'Slash Payment' }
            },
            {
              name: "exchange",
              path: "/payment/exchange/:token",
              component: () => import("@/components/organisms/PaymentExchange"),
              meta: { title: 'Slash Payment' }
            },
            {
              name: "detail",
              path: "/payment/detail/:token",
              component: () => import("@/components/organisms/PaymentDetail"),
              meta: { title: 'Slash Payment' }
            },
            {
              name: "invoice",
              path: "/payment/invoice",
              component: () => import("@/components/organisms/PaymentInvoice"),
              meta: { title: 'Slash Payment' }
            }
          ]
        },
        {
          name: "admin",
          path: "/admin",
          component: () => import("@/pages/admin"),
          meta: { title: 'Slash Apps' }
        },
        {
          name: "admin",
          path: "/admin/dashboard",
          component: () => import("@/pages/admin-page"),
          meta: { title: 'Slash Apps' },
          children: [
            {
              name: "admin",
              path: "/admin/dashboard",
              component: () => import("@/components/organisms/admin/AdminDashboard"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/payment/history",
              component: () => import("@/components/organisms/admin/AdminWeb3Payment"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/payment/settings/contract",
              component: () => import("@/components/organisms/admin/AdminWeb3Payment"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/payment/settings/basic",
              component: () => import("@/components/organisms/admin/AdminWeb3Payment"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/payment/settings/domain",
              component: () => import("@/components/organisms/admin/AdminWeb3Payment"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/invoice",
              component: () => import("@/components/organisms/admin/AdminInvoice"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/keys",
              component: () => import("@/components/organisms/admin/AdminKeys"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/documents",
              component: () => import("@/components/organisms/admin/AdminDocuments"),
              meta: { title: 'Slash Apps' }
            },
          ]
        }
      ]
    }
  ]
});

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
  router.addRoute({
    name: "test",
    path: "/test",
    component: () => import("@/pages/test"),
    meta: { title: 'Slash Payment' },
  })
}

const DEFAULT_TITLE = 'Slash'

router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;