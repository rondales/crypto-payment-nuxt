const store = {
    namespaced: true,
    state: {
      contracts: {}
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
      updateContractCashback({ commit }, payload) {
        commit('updateContractCashback', payload)
      },
      updateContractCashbackRate({ commit }, payload) {
        commit('updateContractCashbackRate', payload)
      },
      updateContractReceiveAddress({ commit }, payload) {
        commit('updateContractReceiveAddress', payload)
      },
      updateNewReceiveAddress({ commit }, payload) {
        commit('updateNewReceiveAddress', payload)
      }
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
      updateContractCashback(state, payload) {
        state.contracts[payload.chainId].cashback.rate = payload.cashbackRate
        state.contracts[payload.chainId].cashback.lastModified = payload.lastModified
      },
      updateContractCashbackRate(state, payload) {
        state.contracts[payload.chainId].cashback.rate = payload.cashbackRate
      },
      updateContractReceiveAddress(state, payload) {
        state.contracts[payload.chainId].receiveAddress.address = payload.receiveAddress
        state.contracts[payload.chainId].receiveAddress.isContract = payload.isContract
        state.contracts[payload.chainId].receiveAddress.lastModified = payload.lastModified
      },
      updateNewReceiveAddress(state, payload) {
        state.contracts[payload.chainId].receiveAddress.address = payload.receiveAddress
      }
    }
  }
  
  export default store