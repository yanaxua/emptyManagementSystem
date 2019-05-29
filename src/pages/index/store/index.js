import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    sidebar: {
      opened:true
    },
  },
  mutations: {
    TOGGLE_SIDEBAR(state, val) {
      state.sidebar.opened = !state.sidebar.opened;
    },
  },
  actions: {

  }
})
export default store
