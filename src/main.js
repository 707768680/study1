// 入口文件
import Vue from "vue";

// 导入 app 组件
import app from "./App.vue";

// 导入 MUI 样式
import "./lib/mui/css/mui.css";

// 导入扩展图标
import "./lib/mui/css/icons-extra.css";

// 导入路由的包
import VueRouter from "vue-router";  
// 安装路由
Vue.use(VueRouter);

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFromat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

// 导入自己的router.js路由模块
import router from "./router.js";

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem ,Button,Lazyload } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
// 导入 vue-resource
import VueResource from "vue-resource";
// 安装 vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io'
// 全局设置 post 时候表单数据格式组织形式  application/x-www-form-urlencoded  https://juejin.im/entry/58eaf351a22b9d0058a8e35c
Vue.http.options.emulateJSON = true;

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router // 挂载路由到实例
});
