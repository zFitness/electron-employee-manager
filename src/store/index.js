import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //定义状态
  state: {
    // 存储token
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
    // 登录的用户id
    userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : null,
    // 是否是管理员
    isSuper: sessionStorage.getItem('isSuper') ? sessionStorage.getItem('isSuper') : false
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      console.log(user);
      state.token = user.token;
      state.userId = user.id;
      state.isSuper = user.super;
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('userId', user.id);
      sessionStorage.setItem('isSuper', user.super);
    }
  },
  actions: {
  },
  modules: {
  }
})
