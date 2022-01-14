const store = {
  namespaced: true,
  state: {
    address: sessionStorage.getItem('address')
      ? sessionStorage.getItem('address')
      : null,
    balance: 0,
    symbol: null
  },
  actions: {
    update({ commit }, payload) {
      commit('update', payload)
    },
  },
  mutations: {
    update(state, payload) {
      state.address = payload.address
      state.balance = payload.balance
      state.symbol = payload.symbol
    }
  }
}

export default store