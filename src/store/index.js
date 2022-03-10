import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

import web3 from './modules/web3'
import account from './modules/account'
import payment from './modules/payment'
import modal from './modules/modal'

Vue.use(Vuex);

var ls = new SecureLS({ isCompression: false })

const store = new Vuex.Store({
  plugins: [
    VuexPersistedState({
      key: 'state',
      paths: [
        'web3.provider',
        'account',
        'payment',
        'hamberger',
        'theme',
        'invoicePage'
      ],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key)
      }
    })
  ],
  modules: {
    web3,
    account,
    payment,
    modal
  },
  state: {
    hamberger: false,
    theme: 'dark',
    invoicePage: true
  },
  actions: {
    hamberger({ commit }) {
      commit('hamberger')
    },
    changeTheme({ commit }, theme) {
      commit('changeTheme', { theme: theme });
    },
    currentPath({ commit }, invoicePage){
      commit('currentPath', invoicePage);
    }
  },
  mutations: {
    hamberger(state) {
      state.hamberger = !state.hamberger
    },
    changeTheme(state, { theme }) {
      state.theme = theme;
    },
    currentPath(state, { invoicePage }) {
      state.invoicePage = invoicePage;
    }
  }
})

export default store