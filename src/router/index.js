import Vue from "vue";
import Router from "vue-router";
import { createRouterLayout } from "vue-router-layout";
import store from "@/store";

Vue.use(Router);

const RouterLayout = createRouterLayout((layout) => {
  return import("@/layouts/" + layout + ".vue");
});

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: async (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    const findEl = async (hash, x) => {
      return document.querySelector(hash) ||
        new Promise((resolve) => {
          if (x > 50) {
            return resolve();
          }
          setTimeout(() => {
            resolve(findEl(hash, ++x || 1));
          }, 100);
        });
    }

    if (to.hash) {
      const el = await findEl(to.hash);

      return window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' });
    }

    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      component: RouterLayout,
      children: [
        {
          name: "home",
          path: "",
          component: () => import("@/pages/index"),
        },
        {
          name: "media_kit",
          path: "/media_kit",
          component: () => import("@/pages/media_kit"),
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
              name: "result",
              path: "/payment/result/:token",
              component: () => import("@/components/organisms/PaymentResult"),
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
              path: "/admin/store",
              component: () => import("@/components/organisms/admin/AdminStore"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/documents",
              component: () => import("@/components/organisms/admin/AdminDocuments"),
              meta: { title: 'Slash Apps' }
            },
            {
              name: "admin",
              path: "/admin/plug-ins",
              component: () => import("@/components/organisms/admin/AdminPlugIns"),
              meta: { title: 'Slash Apps' }
            },
          ]
        }
      ]
    }
  ]
});

if (
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'
  || (process.env.NODE_ENV === 'production' && !JSON.parse(process.env.VUE_APP_USE_MAINNET.toLowerCase()))
) {
  router.addRoute({
    name: "test",
    path: "/test",
    component: () => import("@/pages/test"),
    meta: { title: 'Slash Payment' },
  })
}

if (
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'
) {
  router.addRoute({
    name: "debug",
    path: "/debug",
    component: () => import("@/pages/debug"),
    meta: { title: 'Slash Payment' },
  })
}

const DEFAULT_TITLE = 'Slash'

router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  store.dispatch('wallet/updatePendingStatus', false)
});

export default router;