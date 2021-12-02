import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    connected: false,
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
    connection: {
      provider: null,
      networkId: null,
      walletAddress: null
    },
    theme: "dark",
    invoicePage: true
  },
  actions: {
    onConnect({ commit }, connection) {
      commit('setConnection', connection)
      commit('changeConnectStatus', true)
    },
    onDisconnect({ commit }) {
      commit('setConnection', {
        provider: null,
        networkId: null,
        walletAddress: null
      })
      commit('changeConnectStatus', false)
    },
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
    currentPath({ commit }, invoicePage){
      commit("currentPath", invoicePage);
    }
  },
  mutations: {
    setConnection(state, connection) {
      state.connection.provider = connection.provider
      state.connection.networkId = connection.networkId
      state.connection.walletAddress = connection.walletAddress
    },
    changeConnectStatus(state, status) {
      state.connected = status
    },
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
    currentPath(state, { invoicePage }) {
      state.invoicePage = invoicePage;
    },
  }
})

export default store