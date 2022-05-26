const store = {
  namespaced: true,
  state: {
    links: {
      current_page: 1,
      data: [],
      from: 1,
    },
    link: null,
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
          info: "IOS3161613162626",
        };
      });
    },
  },
  actions: {
    updateLinks({ commit }, payload) {
      commit("updateLinks", payload);
    },
    updateLink({ commit }, payload) {
      commit("updateLink", payload);
    },
  },
  mutations: {
    updateLinks(state, payload) {
      state.links = payload;
    },
    updateLink(state, payload) {
      state.link = payload;
    },
  },
};

export default store;
