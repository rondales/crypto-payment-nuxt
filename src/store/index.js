import Vue from 'vue';
import Vuex from 'vuex';

import web3 from './modules/web3'
import account from './modules/account'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    web3,
    account
  },
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
      size: '',
      message: ''
    },
    connection: {
      provider: null,
      networkId: null,
      walletAddress: null
    },
    theme: "dark",
    invoicePage: true,
    paymentData: {
      merchantDomain: null,
      orderCode: null,
      base_amount: null,
      base_symbol: null,
      email: null,
      selectTokenSymbol: null,
      selectTokenAmount: null
    }
  },
  actions: {
    setReceiveData({ commit }, data) {
      commit('setReceiveData', data)
    },
    setPaymentData({ commit }, data) {
      commit('setPaymentData', data)
    },
    setPaymentBaseAmount({ commit }, amount) {
      commit('setPaymentBaseAmount', amount)
    },
    setPaymentTokenAmount({ commit }, amount) {
      commit('setPaymentTokenAmount', amount)
    },
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
    setReceiveData(state, data) {
      state.paymentData.merchantDomain = data.domain
      state.paymentData.orderCode = data.order_code
      state.paymentData.base_symbol = (data.symbol === null) ? 'USDT' : data.symbol
      state.paymentData.base_amount = data.amount
      state.theme = data.display_theme
    },
    setPaymentData(state, data) {
      state.paymentData.merchantDomain = (data.receiver) ? data.receiver : null
      state.paymentData.orderCode = (data.orderCode) ? data.orderCode : null
      state.paymentData.base_amount = (data.amount) ? data.amount : null
      state.paymentData.base_symbol = (data.symbol) ? data.symbol : 'USDT'
      state.paymentData.email = (data.email) ? data.email : null
      state.paymentData.selectTokenSymbol = (data.selectTokenSymbol) ? data.selectTokenSymbol : null
      state.paymentData.selectTokenAmount = (data.selectTokenAmount) ? data.selectTokenAmount : null
    },
    setPaymentBaseAmount(state, amount) {
      state.paymentData.base_amount = amount
    },
    setEmail(state, email) {
      state.paymentData.email = email
    },
    setPaymentTokenAmount(state, amount) {
      state.paymentData.selectTokenAmount = amount
    },
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