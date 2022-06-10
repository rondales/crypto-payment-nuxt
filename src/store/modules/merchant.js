const store = {
    namespaced: true,
    state: {
      pausedNetworkStatus: []
    },
    actions: {
      updatePausedNetworkStatus({ commit }, payload) {
        commit('updatePausedNetworkStatus', payload)
      }
    },
    mutations: {
      updatePausedNetworkStatus(state, payload) {
        state.pausedNetworkStatus = payload
      }
    }
  }
  
  export default store