import Web3 from 'web3'

const store = {
  namespaced: true,
  state: {
    instance: Web3,
    chaninId: null,
    provider: null
  },
  actions: {
    update({ commit }, payload) {
      commit('update', payload)
    },
    updateChainId({ commit }, payload) {
      commit('updateChainId', payload)
    }
  },
  mutations: {
    update(state, payload) {
      state.instance = payload.instance
      state.chaninId = payload.chaninId
      state.provider = payload.provider
    },
    updateChaninId(state, payload) {
      state.chaninId = payload
    }
  }
}

export default store