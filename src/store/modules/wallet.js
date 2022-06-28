const store = {
  namespaced: true,
  state: {
    pending: false
  },
  actions: {
    initialize({ commit }) {
      commit('initialize')
    },
    updatePendingStatus({ commit }, payload) {
      commit('updatePendingStatus', payload)
    },
  },
  mutations: {
    initialize(state) {
      state.pending = false
    },
    updatePendingStatus(state, payload) {
      state.pending = payload
    }
  }
}

export default store