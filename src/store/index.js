import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    network: {
      name: '',
      icon: '',
      abbriviation: ''
    },
    bases: "",
    humberger: false,
    modal: {
      isShow: false,
      target: '',
      size: ''
    },
    web3: {
      provider: null,
      walletAddress: '',
    },
    theme: "dark",
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
    humberger({ commit }) {
      commit('humberger')
    },
    changeTheme({ commit }, theme) {
      commit("changeTheme", { theme: theme });
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
    selectNetwork(state, { name, icon, abbriviation }) {
      state.modal.isShow = false
      state.modal.target = ''
      state.network.name = name
      state.network.icon = icon
      state.network.abbriviation = abbriviation
    },
    selectBases(state, bases) {
      state.bases = bases
    },
    humberger(state) {
      state.humberger = !state.humberger
    },
    changeTheme(state, { theme }) {
      state.theme = theme;
    },
  }
})

export default store