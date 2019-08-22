import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import menu from './modules/menu'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      geo,
      menu
    },
    actions: {
      // store 生命周期函数
      async nuxtServerInit({ commit }, { req, app }) {
        const {
          status,
          data: { province, city }
        } = await app.$axios.get('/geo/getPosition')
        commit(
          'geo/setPosition',
          status === 200 ? { city, province } : { city: '', province: '' }
        )
        const {
          status: status2,
          data: { menu }
        } = await app.$axios.get('/geo/menu')
        commit('menu/setMenu', status2 === 200 ? menu : [])
      }
    }
  })

export default store
