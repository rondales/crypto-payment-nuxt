const store = {
  namespaced: true,
  state: {
    headerInvoice: false,
    domain: null,
    orderCode: null,
    amount: null,
    symbol: null,
    fee: null,
    transactionHash: null,
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
    updateStatus({ commit }, payload) {
      commit('updateStatus', payload)
    },
    updateToken({ commit }, payload) {
      commit('updateToken', payload)
    }
  },
  mutations: {
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
    updateToken(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state.token[key] = value
      })
    }
  }
}

export default store