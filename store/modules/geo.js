const state = () => ({
  position: ''
})

const mutations = {
  setPosition(state, val) {
    state.position = val
  }
}

const actions = {
  setPosition({ commit }, val) {
    commit('setPosition', val)
  }
}

export default { namespaced: true, state, mutations, actions }
