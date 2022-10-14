const store = {
  namespaced: true,
  state: {
    parentOrigin: null
  },
  actions: {
    updateParentOrigin({ commit }, payload) {
      commit('updateParentOrigin', payload)
    }
  },
  mutations: {
    updateParentOrigin(state, payload) {
      state.parentOrigin = payload
    },
  }
}

export default store