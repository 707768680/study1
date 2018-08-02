# 这是一个 NB 的项目

## 这是一个 NB 的项目

### 这是一个 NB 的项目

#### 这是一个 NB 的项目 。。。

## 制作首页 APP 组件

1.  完成 Header 区域, 使用的是 Mint-UI 中的 Header 组件
2.  制作底部 Tabbar 区域, 使用的是 MUI 的 Tabbar.html
3.  在中间区域放置一个 router-view 来展示路由匹配到的组件

- css 样式拷贝 tff 文件拷贝
- 修改图标的样式

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接,展示对应的组件

## 加载轮播图数据

1.  获取数据,vue-resource
2.  使用 vue-resource 的 this.$http.get 获取数据
3.  获取到的数据,要保存到 data 身上
4.  使用 v-for 循环渲染每个 item 项
5.  .....

## 新闻资讯页面制作

1.  绘制界面 使用 MUI 中的 media-list
2.  使用 vue resource 获取数据
3.  在路由模块中,将 新闻详情的路由地址和组件页对应起来

## 实现 新闻详情 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 组件模板

1.  先创建一个单独的 comment 组件的页面 先手动导入 comment 组件
2.  在需要使用 comment 组件的页面中 先手动导入 comment 组件

- imoport comment forrm './comment.vue'

3.  在父组件中,使用'component' 属性,将刚才导入 comment 组件, 注册文自己的子组件
4.  将注册子组件时候的 注册名称,以 标签形式,在页面中引用即可

## 获取所有的评论数据显示页面中

## 实现点击加载更多评论的功能

1.  为加载更多按钮, 绑定点击事件, 在事件中,请求下一页数据
2.  点击加载更多,让 pageIndex++, 然后重新调用 this.getComments() 方法重新获取最新一页数据
3.  为了防止 新数据 覆盖老数据的情况,我们在 点击加载更多的时候,每当获取到新数据,应该让 老数据调用数组的 concat 方法拼接上新数据

## 发表评论

1.  把文本框做双向数据绑定
2.  为发表按钮绑定一个事件
3.  校验评论内容是否为空,如果为空 Toast 提示 不能为空
4.  校验成功 vue-resource 发送一个请求 把评论内容提交给服务器
5.  当发表评论 ok 后 ,重新刷新列表,以查看最新评论 调用 getComments

- 如果调用 getcomments 方法重新刷新评论列表,可能只获取到最后一页的评论,前几页的评论获取不到
- 换一种思路,当评论成功后,在客户端,手动拼接出一个最新的评论对象,然后调用数组的 unshift 方法,把最新的评论,追加到 data 中的 comment 的开头 ,这样...

## 改造图片分析 按钮为 路由的连接并显示对应的组件页面

## 回执图片列表 组件页面结构并美化样式

1.  制作顶部滑动条
2.  制作底部图片列表

## 制作顶部滑动条

1.  需要借助于 MUI 中的 tab-top-webview-main.html
2.  需要把 slider 区域的 mui-fullscreen 类去掉
3.  滑动条无法正常触发滑动,通过检查官方文档,发现这是 js 组件,需要被初始化:

- 导入 mui.js
- 调用官方提供的 方式 去初始化

```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
```
4. 我们在初始化 滑动条的时候, 导入的mui.js ,但是控制台报错: Uncaught TypeError: 'caller','callee',and 'arguments' properties may not be accessed on strict mode
 + 经过推测,可能是 mui.js 中用到了这三个 ,但是 webpack 打包好的 bundle.js 中默认启用严格模式,所以这两者冲突了;
 + 解决方案: 1. 把 mui.js 中的非严格 模式的代码改掉,但不现实; 
            2. 把 webpack 打包时的严格模式禁用掉  √

5. 刚进入图片分享页面时候,滑动条无法正常工作,经过分析,发现,如果要初始化滑动条,必须要等 DOM 元素加载完毕,所以,要把初始化 滑动条的代码搬到 mounted 生命周期函数中

6. 当滑动条调试好后,发现, tabbar 无法工作, 这时候,需要把每个 tabbar 按钮的样式中 'mui-tab-item'重新改下名字并把样式在 style 中重写

7. 获取所有分类,并渲染分类列表

### 制作图片列表区域
1. 图片列表需要使用懒加载技术,我们可以使用 Mint-UI 提供的现成组件 'lazy-load'
2. 根据'lazy-load' 的使用文档,尝试使用
3. 渲染图片列表数据





