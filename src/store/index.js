import Vue from 'vue';
import Vuex from 'vuex';

import web3 from './modules/web3'
import account from './modules/account'
import payment from './modules/payment'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    web3,
    account,
    payment
  },
  state: {
    humberger: false,
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
    humberger({ commit }) {
      commit('humberger')
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
    humberger(state) {
      state.humberger = !state.humberger
    },
    changeTheme(state, { theme }) {
      state.theme = theme;
    },
    currentPath(state, { invoicePage }) {
      state.invoicePage = invoicePage;
    },
  }
})

export default store