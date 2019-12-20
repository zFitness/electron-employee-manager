import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //定义状态
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, token) {
      state.Authorization = token;
      localStorage.setItem('Authorization', token);
    }
  },
  actions: {
  },
  modules: {
  }
})
