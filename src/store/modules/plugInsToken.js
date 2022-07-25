const store = {
  namespaced: true,
  state: {
    token: null
  },
  actions: {
    updateToken({ commit }, payload) {
      commit("updateToken", payload);
    },
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload;
    },
  },
};

export default store;
