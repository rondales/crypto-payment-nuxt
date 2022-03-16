const store = {
  namespaced: true,
  state: {
    address: null,
    balance: 0,
    symbol: null,
    receive: {
      isSelected: false,
      isSettingComplete: false
    },
  },
  actions: {
    // トークン選択後の画面切り替え判定
    selectReceiveToken({ commit }) {
      commit('selectReceiveToken')
    },
    // 設定後の画面切り替え判定
    settingComplete({ commit }){
      commit('settingComplete')
    },
    initialize({ commit }) {
      commit('initialize')
    },
    update({ commit }, payload) {
      commit('update', payload)
    },
  },
  mutations: {
    initialize(state) {
      state.address = null
      state.balance = 0
      state.symbol = null
    },
    selectReceiveToken(state){
      state.receive.isSelected = true;
    },
    settingComplete(state) {
      state.receive.isSettingComplete = true;
    },    
    update(state, payload) {
      state.address = payload.address
      state.balance = payload.balance
      state.symbol = payload.symbol
    }
  }
}

export default store