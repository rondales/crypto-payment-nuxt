const store = {
  namespaced: true,
  state: {
    id: null,
    headerInvoice: false,
    domain: null,
    isVerifiedDomain: null,
    merchantWalletAddress: null,
    orderCode: null,
    amount: null,
    amountWei: null,
    symbol: null,
    fee: null,
    transactionHash: null,
    availableNetworks: [],
    status: 1,
    allowCurrencies: {
      USD: false,
      JPY: false,
      EUR: false,
      AED: false
    },
    token: {
      name: null,
      symbol: null,
      decimal: null,
      address: null,
      balance: null,
      amount: null,
      rate: null
    }
  },
  actions: {
    initialize({ commit }) {
      commit('initialize')
    },
    update({ commit }, payload) {
      commit('update', payload)
    },
    updateHeaderInvoice({ commit }, payload) {
      commit('updateHeaderInvoice', payload)
    },
    updateAmount({ commit }, payload) {
      commit('updateAmount', payload)
    },
    updateAmountWei({ commit }, payload) {
      commit('updateAmountWei', payload)
    },
    updateFee({ commit }, payload) {
      commit('updateFee', payload)
    },
    updateTransactionHash({ commit }, payload) {
      commit('updateTransactionHash', payload)
    },
    updateAvailableNetworks({ commit }, payload) {
      commit('updateAvailableNetworks', payload)
    },
    updateStatus({ commit }, payload) {
      commit('updateStatus', payload)
    },
    updateAllowCurrencies({ commit }, payload) {
      commit('updateAllowCurrencies', payload)
    },
    updateToken({ commit }, payload) {
      commit('updateToken', payload)
    }
  },
  mutations: {
    initialize(state) {
      state.id = null
      state.headerInvoice = false
      state.domain = null
      state.isVerifiedDomain = null
      state.merchantWalletAddress = null
      state.orderCode = null
      state.amount = null
      state.amountWei = null
      state.symbol = null
      state.fee = null
      state.transactionHash = null
      state.availableNetworks = []
      state.status = 1
      state.allowCurrencies = {
        USD: false,
        JPY: false,
        EUR: false,
        AED: false
      },
      state.token = {
        name: null,
        symbol: null,
        decimal: null,
        address: null,
        balance: null,
        amount: null,
        rate: null
      }
    },
    update(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state[key] = value
      })
    },
    updateHeaderInvoice(state, payload) {
      state.headerInvoice = payload
    },
    updateAmount(state, payload) {
      state.amount = payload
    },
    updateAmountWei(state, payload) {
      state.amountWei = payload
    },
    updateFee(state, payload) {
      state.fee = payload
    },
    updateStatus(state, payload) {
      state.status = payload
    },
    updateTransactionHash(state, payload) {
      state.transactionHash = payload
    },
    updateAvailableNetworks(state, payload) {
      state.availableNetworks = payload
    },
    updateAllowCurrencies(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state.allowCurrencies[key] = value
      })
    },
    updateToken(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state.token[key] = value
      })
    }
  }
}

export default store