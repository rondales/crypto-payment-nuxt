const store = {
  namespaced: true,
  state: {
    id: null,
    headerInvoice: false,
    domain: null,
    orderCode: null,
    amount: null,
    symbol: null,
    fee: null,
    transactionHash: null,
    availableNetworks: [],
    status: 1,
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
    updateToken({ commit }, payload) {
      commit('updateToken', payload)
    }
  },
  mutations: {
    initialize(state) {
      state.id = null
      state.headerInvoice = false
      state.domain = null
      state.orderCode = null
      state.amount = null
      state.symbol = null
      state.fee = null
      state.transactionHash = null
      state.availableNetworks = []
      state.status = 1
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
    updateToken(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state.token[key] = value
      })
    }
  }
}

export default store