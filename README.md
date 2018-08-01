# 这是一个NB 的项目

## 这是一个NB 的项目

### 这是一个NB 的项目

#### 这是一个NB 的项目 。。。

## 制作首页APP组件
1. 完成 Header 区域, 使用的是 Mint-UI 中的 Header 组件
2. 制作底部 Tabbar 区域, 使用的是 MUI 的 Tabbar.html
3. 在中间区域放置一个 router-view 来展示路由匹配到的组件
 + css样式拷贝  tff文件拷贝
 + 修改图标的样式

## 改造tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接,展示对应的组件

## 加载轮播图数据
1. 获取数据,vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据,要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项
5. .....

## 新闻资讯页面制作
1. 绘制界面 使用 MUI 中的 media-list
2. 使用 vue resource 获取数据
3. 在路由模块中,将 新闻详情的路由地址和组件页对应起来

## 实现 新闻详情 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 组件模板
1. 先创建一个单独的 comment 组件的页面 先手动导入 comment 组件
2. 在需要使用 comment 组件的页面中 先手动导入 comment 组件
 + imoport comment forrm './comment.vue'
3. 在父组件中,使用'component' 属性,将刚才导入 comment 组件, 注册文自己的子组件
4. 将注册子组件时候的 注册名称,以 标签形式,在页面中引用即可

## 获取所有的评论数据显示页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮, 绑定点击事件, 在事件中,请求下一页数据
2. 点击加载更多,让 pageIndex++, 然后重新调用 this.getComments() 方法重新获取最新一页数据
3. 为了防止 新数据 覆盖老数据的情况,我们在 点击加载更多的时候,每当获取到新数据,应该让 老数据调用数组的 concat 方法拼接上新数据