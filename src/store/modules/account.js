const store = {
  namespaced: true,
  state: {
    address: null,
    balance: 0,
    symbol: null,
    isCopied: false,
    receiveSymbol: null,
    receive: {
      isSelected: false,
      isSettingComplete: false
    },
    note: null
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
    updateAddress({ commit }, payload) {
      commit('updateAddress', payload)
    },
    updateReceiveSymbol({ commit }, payload) {
      commit('updateReceiveSymbol', payload)
    },
    updateNote({ commit }, payload) {
      commit('updateNote', payload)
    }
  },
  mutations: {
    initialize(state) {
      state.address = null
      state.balance = 0
      state.symbol = null
      state.receiveSymbol = null
      state.note = null
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
    },
    updateAddress(state, payload) {
      state.address = payload
    },
    updateReceiveSymbol(state, payload) {
      state.receiveSymbol = payload
    },
    updateNote(state, payload) {
      state.note = payload
    }
  }
}

export default store