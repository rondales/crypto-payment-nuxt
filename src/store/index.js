import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    network: null,
    bases: "",
    modal: {
      isShow: false,
      target: '',
      size: ''
    },
    web3: {
      provider: null,
      walletAddress: '',
    }
  },
  actions: {
    onLogin({ commit }, payload) {
      commit('onLogin', payload)
    },
    onLogout({ commit }) {
      commit('onLogout')
    },
    openModal({ commit }, {target, size}) {
      const modalData = {
        target: target,
        size: size
      }
      commit('openModal', modalData)
    },
    closeModal({ commit }) {
      commit('closeModal')
    },
    selectNetwork({ commit }, currency) {
      commit('selectNetwork', currency)
    },
    selectBases({ commit }, bases) {
      commit('selectBases', bases)
    },
  },
  mutations: {
    onLogin(state, payload) {
      state.isLogin = true
      state.web3.provider = payload.provider
      state.web3.walletAddress = payload.walletAddress
      state.modal.isShow = false
    },
    onLogout(state) {
      state.isLogin = false
    },
    openModal(state, { target, size }) {
      state.modal.isShow = true
      state.modal.target = target
      state.modal.size = size
    },
    closeModal(state) {
      state.modal.isShow = false
      state.modal.target = ''
    },
    selectNetwork(state, currency) {
      state.modal.isShow = false
      state.modal.target = ''
      state.network = currency
    },
    selectBases(state, bases) {
      state.bases = bases
    }
  }
})

export default store