const store = {
  namespaced: true,
  state: {
    address: null,
    balance: 0,
    symbol: null,
    isCopied: false,
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
    // コピー判定した時のUI表示
    copied({ commit }){
      commit('copied')
      setTimeout(() => {
        commit('notCopy')
      }, 1000)
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
    copied(state){
      state.isCopied = true;
    },
    notCopy(state){
      state.isCopied = false;
    },
    update(state, payload) {
      state.address = payload.address
      state.balance = payload.balance
      state.symbol = payload.symbol
    }
  }
}

export default store