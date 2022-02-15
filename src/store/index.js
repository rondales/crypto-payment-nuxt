import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

import web3 from './modules/web3'
import account from './modules/account'
import payment from './modules/payment'

Vue.use(Vuex);

var ls = new SecureLS({ isCompression: false })

const store = new Vuex.Store({
  plugins: [
    VuexPersistedState({
      key: 'state',
      paths: [
        'web3.provider',
        'payment',
        'humberger',
        'modal',
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
    payment
  },
  state: {
    hamberger: false,
    modal: {
      isShow: false,
      target: '',
      size: '',
      message: ''
    },
    theme: 'dark',
    invoicePage: true
  },
  actions: {
    openModal({ commit }, {target, size, message = ''}) {
      const modalData = {
        target: target,
        size: size,
        message: message
      }
      commit('openModal', modalData)
    },
    closeModal({ commit }) {
      commit('closeModal')
    },
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
    openModal(state, { target, size, message }) {
      state.modal.isShow = true
      state.modal.target = target
      state.modal.size = size
      state.modal.message = message
    },
    closeModal(state) {
      state.modal.isShow = false
      state.modal.target = ''
    },
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