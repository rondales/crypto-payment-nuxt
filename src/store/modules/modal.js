const store = {
  namespaced: true,
  state: {
    show: false,
    target: '',
    size: '',
    params: {}
  },
  actions: {
    show({ commit }, { target, size, params = {} }) {
      commit('show', {
        target: target,
        size: size,
        params: params
      })
    },
    hide({ commit }) {
      commit('hide')
    }
  },
  mutations: {
    show(state, { target, size, params }) {
      state.target = target
      state.size = size
      state.params = params
      state.show = true
    },
    hide(state) {
      state.show = false
      state.target = ''
      state.size = ''
      state.params = {}
    }
  }
}

export default store