const store = {
  namespaced: true,
  state: {
    links: {
      current_page: 1,
      data: [],
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 1,
      total: 1
    },
  },
  getters: {
    links(state) {
      return state.links.data.map((link) => {
        return {
          id: link.id,
          linkUrl: `${process.env.VUE_APP_API_BASE_URL}/${link.code}`,
          code: link.code,
          merchantId: link.merchantId,
          status: link.active,
          lastLogin: "30/9/2021 00:00",
          note: link.note,
          info: link.device_name,
        };
      });
    },
  },
  actions: {
    updateLinks({ commit }, payload) {
      commit("updateLinks", payload);
    },
  },
  mutations: {
    updateLinks(state, payload) {
      state.links = payload;
    },
  },
};

export default store;
