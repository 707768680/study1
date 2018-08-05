import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/newslist.vue'
import NewInfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/photolist.vue'
import PhotoInfo from './components/photos/photoinfo.vue'
import GoodsList from './components/goods/GoodList.vue'
import GoodsInfo from './components/goods/goodsinfo.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [
   { path: '/', redirect: '/home' },
   { path:'/home', component: HomeContainer },
   { path:'/member', component: MemberContainer },
   { path:'/shopcar', component: ShopcarContainer },
   { path:'/search', component: SearchContainer },
   { path:'/home/newslist',component: NewsList },
   { path:'/home/newsinfo/:id',component:NewInfo },
   { path:'/home/photolist',component:PhotoList },
   { path:'/home/photoinfo/:id',component:PhotoInfo },
   { path:'/home/goodslist/',component:GoodsList },
   { path:'/home/goodsinfo/:id',component:GoodsInfo ,name: 'goodsinfo'}
  ],
  linkActiveClass: 'mui-active'  // 覆盖默认的路由高亮的类, 默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router