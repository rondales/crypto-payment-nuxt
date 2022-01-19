const store = {
  namespaced: true,
  state: {
    domain: null,
    orderCode: null,
    amount: null,
    symbol: null,
    paySymbol: null,
    payAmount: null
  },
  actions: {
    update({ commit }, payload) {
      commit('update', payload)
    },
    updateAmount({ commit }, payload) {
      commit('updateAmount', payload)
    },
    updatePaySymbol({ commit }, payload) {
      commit('updatePaySymbol', payload)
    },
    updatePayAmount({ commit }, payload) {
      commit('updatePaySymbol', payload)
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
    updatePaySymbol(state, payload) {
      state.paySymbol = payload
    },
    updatePayAmount(state, payload) {
      state.payAmount = payload
    }
  }
}

export default store