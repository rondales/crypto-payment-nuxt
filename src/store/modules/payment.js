const store = {
  namespaced: true,
  state: {
    domain: null,
    orderCode: null,
    amount: null,
    symbol: null,
    fee: null,
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
    updateAmount({ commit }, payload) {
      commit('updateAmount', payload)
    },
    updateFee({ commit }, payload) {
      commit('updateFee', payload)
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
    updateAmount(state, payload) {
      state.amount = payload
    },
    updateFee(state, payload) {
      state.fee = payload
    },
    updateToken(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state.token[key] = value
      })
    }
  }
}

export default store