<template>
    <div>
        <ul class="mui-table-view">
				<!-- <li class="mui-table-view-cell mui-media"  v-for="item in newslist"  :key="item.id">
					<router-link :to="'/home/newsinfo' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.image_url">
						<div class="mui-media-body">
							<h4>{{ item.title }}</h4>
							<p class='mui-ellipsis'>
                                <span>{{ item.time | dataFormat}}</span> 
                                <span>{{ item.click }}</span>
                            </p>
						</div>
					</router-link>
				</li> -->
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
						<div class="mui-media-body">
							幸福
							<p class='mui-ellipsis'>
                                <span>发布时间:2018-12-12 12-12</span>
                                <span>点击数 0</span>
                            </p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/menu2.png">
						<div class="mui-media-body">
							木屋
							<p class='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../images/menu3.png">
						<div class="mui-media-body">
							CBD
							<p class='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
					</a>
				</li>

			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
	data() {
		return {
			newslist: []  //新闻列表
		};
	},
	create (){

	},
	methods: {
		getNewsList() {
			this.$http.get("api/getnewslist").then(result => {
				if (result.body.status === 0){
					this.newslist = result.body.message;
				} else {
					Toast("获取新闻列表失败!");
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
    .mui-ellipsis{
        display: flex;
        justify-content: space-between;
    }
</style>
