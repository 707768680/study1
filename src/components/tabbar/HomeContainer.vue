<template>
	<div>
	<!-- 轮播图区 -->
	  <mt-swipe :auto="4000">
  	    <mt-swipe-item>
  	    	
  	    </mt-swipe-item>
  	    <mt-swipe-item>
  	    	
  	    </mt-swipe-item>
  	    <mt-swipe-item>
  	    	
  	    </mt-swipe-item>
		<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>	
	  </mt-swipe>

	  <ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/newlist">
			        <img src="../../images/menu1.png" height="119" width="120" alt="">
			        <div class="mui-media-body">新闻资讯</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				<router-link to="/home/photolist">
			        <img src="../../images/menu2.png" height="119" width="120" alt="">
			        <div class="mui-media-body">图片分享</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
			       <img src="../../images/menu3.png" height="119" width="120" alt="">
			        <div class="mui-media-body">商品购买</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			       <img src="../../images/menu4.png" height="119" width="120" alt="">
			        <div class="mui-media-body">留言反馈</div></a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			        <img src="../../images/menu5.png" height="119" width="120" alt="">
			        <div class="mui-media-body">视频专区</div></a></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			       <img src="../../images/menu6.png" height="119" width="120" alt="">
			        <div class="mui-media-body">联系我们</div></a></li>
		</ul> 

	 
	</div>
</template>

<script>
	import swiper from "../subcomponents/swiper.vue"
	import { Toast } from 'mint-ui';

	export default {
		data(){
			return {
				lunbotuList: []  // 保存轮播图的数组
			};
		},
		created() {
			this.getLunbotu();
		},
		methods: {
			getLunbotu() {
				this.$http.get("api/getlunbo").then(result =>{
					if (result.body.status === 0){
						this.lunbotuList = result.body.message;
					} else {
						Toast('加载轮播图失败')
					}
				});
			}
		},
		comments :{
			swiper
		}
	};

</script>

<style lang="scss" scoped>

	.mint-swipe {
		height: 200px;

		.mint-swipe-item {
		    &:nth-child(1){
				background-color: red;
			}
			&:nth-child(2){
				background-color: yellow;
			}
			&:nth-child(3){
				background-color: blue;
			} 

			img {
				width: 100%;
				height: 100%;
			}
		}
		
	}

	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: none;
		img {
			width: 60px;
			height: 60px;
		}

		.mui-media-body{
			font-size:13px;
		}
	}

	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border:0;
	}
</style>