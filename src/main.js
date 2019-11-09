import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import global_ from "./config/global";
import qs from "qs"

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.prototype.GLOBAL = global_;

axios.defaults.baseURL = global_.Base_URL;
axios.defaults.headers["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use((config) => {
  // // 数据格式化
  // config.data = qs.stringify(config.data);
  // 给请求头加键值对
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
}, (error ) => {	// 错误信息
  return Promise.reject(error.response);
});

// 路由响应拦截
// http response 拦截器
// axios.interceptors.response.use(
//   (response) => {
//     if (response.data.code !== 200) {
//       // 异常请求要做的事
//     } else {
//       // 正常请求要做的事
//     }
//   },(error) => {
//     // 返回接口返回的错误信息
//     return Promise.reject(error.response)
//   }
// );

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
