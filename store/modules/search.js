const state = () => ({
  hotPlace: []
})

const mutations = {
  setHotPlace(state, val) {
    state.hotPlace = val
  }
}

const actions = {
  setHotPlace({ commit }, val) {
    commit('setHotPlace', val)
  }
}

export default { namespaced: true, state, mutations, actions }
