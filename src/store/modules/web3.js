const store = {
  namespaced: true,
  state: {
    instance: null,
    chainId: null,
    provider: null
  },
  actions: {
    initialize({ commit }) {
      commit('initialize')
    },
    update({ commit }, payload) {
      commit('update', payload)
    },
    updateInstance({ commit }, payload) {
      commit('updateInstance', payload)
    },
    updateChainId({ commit }, payload) {
      commit('updateChainId', payload)
    }
  },
  mutations: {
    initialize(state) {
      state.instance = null
      state.chainId = null
      state.provider = null
    },
    update(state, payload) {
      state.instance = payload.instance
      state.chainId = payload.chainId
      state.provider = payload.provider
    },
    updateInstance(state, payload) {
      state.instance = payload
    },
    updateChainId(state, payload) {
      state.chainId = payload
    }
  }
}

export default store