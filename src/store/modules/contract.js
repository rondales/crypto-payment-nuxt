const store = {
    namespaced: true,
    state: {
      contracts: {},
      loaded: false
    },
    actions: {
      addContracts({ commit }, payload) {
        commit('addContracts', payload)
      },
      updateContractProcessing({ commit }, payload) {
        commit('updateContractProcessing', payload)
      },
      updateContractAvailable({ commit }, payload) {
        commit('updateContractAvailable', payload)
      },
      updateContractTxAddess({ commit }, payload) {
        commit('updateContractTxAddess', payload)
      },
      updateContractAddress({ commit }, payload) {
        commit('updateContractAddress', payload)
      },
      updateContractsLoaded({ commit }, payload) {
        commit('updateContractsLoaded', payload)
      },
    },
    mutations: {
      addContracts(state, payload) {
        state.contracts = Object.assign({}, payload)
      },
      updateContractProcessing(state, payload) {
        state.contracts[payload.chainId].processing = payload.processing
      },
      updateContractAvailable(state, payload) {
        state.contracts[payload.chainId].available = payload.available
      },
      updateContractTxAddess(state, payload) {
        state.contracts[payload.chainId].transactionAddess = payload.address
      },
      updateContractAddress(state, payload) {
        state.contracts[payload.chainId].address = payload.address
      },
      updateContractsLoaded(state, payload) {
        state.loaded = payload
      },
    }
  }
  
  export default store