import Vue from "vue";
import Router from "vue-router";
import { createRouterLayout } from "vue-router-layout";

Vue.use(Router);

const RouterLayout = createRouterLayout((layout) => {
  return import("@/layouts/" + layout + ".vue");
});

export default new Router({
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
          children: [
            { name: "price", path: "/payment", component: () => import("@/components/organisms/PaymentPriceHandler") },
            { name: "invoice", path: "/payment/invoice", component: () => import("@/components/organisms/PaymentInvoice") },
            { name: "wallets", path: "/payment/wallets", component: () => import("@/components/organisms/PaymentSelectWallets") },
            { name: "token", path: "/payment/token", component: () => import("@/components/organisms/PaymentToken") },
            { name: "exchange", path: "/payment/exchange", component: () => import("@/components/organisms/PaymentExchange") },
            { name: "detail", path: "/payment/detail", component: () => import("@/components/organisms/PaymentDetail") },
          ]
        },
        {
          name: "admin",
          path: "/admin",
          component: () => import("@/pages/admin"),
        },
        {
          name: "admin",
          path: "/admin/dashboard",
          component: () => import("@/pages/admin-page"),
          children: [
            { name: "admin" , path: "/admin/dashboard", component: () => import("@/components/organisms/admin/AdminDashboard") },
            { name: "admin" , path: "/admin/web3payment", component: () => import("@/components/organisms/admin/AdminWeb3Payment") },
            { name: "admin" , path: "/admin/invoice", component: () => import("@/components/organisms/admin/AdminInvoice") },
            { name: "admin" , path: "/admin/keys", component: () => import("@/components/organisms/admin/AdminKeys") },
            { name: "admin" , path: "/admin/documents", component: () => import("@/components/organisms/admin/AdminDocuments") },
          ]
        },
      ],
    },
  ],
});
