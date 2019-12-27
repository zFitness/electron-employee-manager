import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import './plugins/element.js'

// 导入iconfont 的自定义图标
import './assets/iconfont/iconfont.css';
// 饼图
import Pie from 'v-charts/lib/pie.common';
//地图
import Map from 'v-charts/lib/map.common'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component(Pie.name, Pie);
Vue.component(Map.name, Map);
//把vuex定义成全局组件
Vue.prototype.$store = store
// 使用全局变量
import global_msg from './global.js'   //注意文件路径，实际路径以项目目录结构为准
Vue.prototype.$global_msg = global_msg;


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)

}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
