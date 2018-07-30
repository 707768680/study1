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

// 导入自己的router.js路由模块
import router from "./router.js";

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem } from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入 vue-resource
import VueResource from "vue-resource";
// 安装 vue-resource
Vue.use(VueResource);

var vm = new Vue({
  el: "#app",
  render: c => c(app),
  router // 挂载路由到实例
});
