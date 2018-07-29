// 入口文件
import Vue from 'vue'

// 导入 app 组件
import app from './App.vue'

// 导入 MUI 样式
import './lib/mui/css/mui.css'

// 按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)


var vm = new Vue({
	el:'#app',
	render: c => c(app)
})
