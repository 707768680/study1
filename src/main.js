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

// 注册 vuex
import Vuex from 'vuex'
vue.use(Vuex)

// 每次刚进入网站,肯定会 调用 main.js, 在刚调用的时候,把购物车的数据读出来,放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state:{  //  this.$store.state.***
    car: []  // 将购物车中商品的数据,用一个数组存储起来,存储一些商品的对象,
    // {id: 商品id, count: 要购买的数量, price: 商品的单价, selected: 是否选中该商品}
  }, 
  mutations: {  // this.$store.commit('方法名称','按需传递唯一的参数')
    addToCar(state, goodsinfo){
      // 点击加入购物车,把商品信息,保存到 car 上 
      // 如果购物车之前就有对应商品,那么只更新数量
      // 如果没有,直接把商品数据 push 进 car 中
      // 假设在购物车中没有找到对应商品
      var flag = false 
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 说明没找到
      if(!flag){
        state.car.push(goodsinfo)
      }

      // 当更新 car 之后 , 把 car 数组, 存储到 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updatedGoodsInfo(state,goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析: 
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
       // 当更新 car 之后 , 把 car 数组, 存储到 localStorage 中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      // 根据 id 从 store 中的购物车中删除对用的那条商品数据
      state.car.some((item,i) => {
        if(item.id == id){
          state.car.splice(i,1)
          return true;
        }
      })
    },
    updatedGoodsSelected(state,info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected
        }
      })
       // 当更新 car 之后 , 把 car 数组, 存储到 localStorage 中
       localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters: {  // this.$store.getters.***
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      var o = {}
      state.car.forEach(item => {
        0[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0,  // 勾选的数量
        amount:0  // 勾选的总价
      }
      state.car.forEach(item => {
        if(item.selected){
          o.count += item.count
          o.amount += item.count * item.price
        }
      })
      return o
    }
  }
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFromat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

// 导入自己的router.js路由模块
import router from "./router.js";

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 全局导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem ,Button,Lazyload } from "mint-ui";
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
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
  router, // 挂载路由到实例
  store  // 挂载 store 的状态管理对象
});
