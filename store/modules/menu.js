const state = () => ({
  menu: []
})

const mutations = {
  setMenu(state, val) {
    state.menu = val
  }
}

const actions = {
  setMenu({ commit }, val) {
    commit('setMenu', val)
  }
}

export default { namespaced: true, state, mutations, actions }
