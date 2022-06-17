const store = {
  namespaced: true,
  state: {
    pending: false
  },
  actions: {
    updatePendingStatus({ commit }, payload) {
      commit('updatePendingStatus', payload)
    },
  },
  mutations: {
    updatePendingStatus(state, payload) {
      state.pending = payload
    }
  }
}

export default store