import Vue from "vue";
import Vuex from "vuex";
import VuexPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import web3 from "./modules/web3";
import account from "./modules/account";
import payment from "./modules/payment";
import modal from "./modules/modal";
import deeplink from "./modules/deeplink";
import plugInsToken from "./modules/plugInsToken";
import merchant from "./modules/merchant";
import contract from "./modules/contract";
import wallet from "./modules/wallet";

Vue.use(Vuex);

var ls = new SecureLS({ isCompression: false });

const store = new Vuex.Store({
  plugins: [
    VuexPersistedState({
      key: "state",
      paths: [
        "web3.provider",
        "account",
        "payment",
        "hamberger",
        "theme",
        "invoicePage",
        "merchant",
        "contract",
        "wallet",
      ],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  modules: {
    web3,
    account,
    contract,
    merchant,
    payment,
    deeplink,
    plugInsToken,
    wallet,
    modal
  },
  state: {
    hamberger: false,
    theme: "dark",
    invoicePage: true,
    accountMenu: false,
  },
  actions: {
    hamberger({ commit }) {
      commit("hamberger");
    },
    changeTheme({ commit }, theme) {
      commit("changeTheme", { theme: theme });
    },
    currentPath({ commit }, invoicePage) {
      commit("currentPath", invoicePage);
    },
    toggleAccountMenu({ commit }) {
      commit("toggleAccountMenu");
    },
  },
  mutations: {
    hamberger(state) {
      state.hamberger = !state.hamberger;
    },
    changeTheme(state, { theme }) {
      state.theme = theme;
    },
    currentPath(state, { invoicePage }) {
      state.invoicePage = invoicePage;
    },
    toggleAccountMenu(state) {
      state.accountMenu = !state.accountMenu;
    },
  },
});

export default store;
