const store = {
  namespaced: true,
  state: {
    address: null,
    balance: 0,
    symbol: null
  },
  actions: {
    initialize({ commit }) {
      commit('initialize')
    },
    update({ commit }, payload) {
      commit('update', payload)
    },
  },
  mutations: {
    initialize(state) {
      state.address = null
      state.balance = 0
      state.symbol = null
    },
    update(state, payload) {
      state.address = payload.address
      state.balance = payload.balance
      state.symbol = payload.symbol
    }
  }
}

export default store