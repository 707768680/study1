<template>
	<div class="shopcar-container">
		<div class="goos-list">
			<!-- 商品列表区 -->
			<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
						@change="selectedchange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">	
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initcount=" $store.getters.getGoodsCount[item.id] " goodsid="item.id"></numbox>
								<!-- 从购物车中获取商品的数量
								先创建一个空对象,然后循环购物车中所有的商品的数据,把当前这条商品的 ID 作为对象的属性名,
								count 作为对象的属性值,这样就得到一个对象 {{ 88: 2,89: 3,90: 4 }} -->
								<a href="#" @click.prevent="remove(item.id,i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 结算区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan" >
					<div class="left">
						<p>总计(不含运费)</p>
						<p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件,
						总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span> </p>
					</div>
					<mt-button type="danger">去结算</mt-button>
				</div>				
			</div>
		</div>
	</div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue';
export default {
	data(){ 
		return {
			goodslist: []
		}
	},
	created() {
		getGoodsList()
	},
	methods: {
		getGoodsList(){
			// 获取到 store 中所有的商品 ID ,然后拼接出一个用逗号分开的字符串用作 url 参数
			var idArr = [];
			this.$store.state.car.forEach(item => {idArr.push(item.id)});
			// 如果购物车没有商品,则直接返回,不能请求数据接口,否则会报错
			if(idArr.length <= 0){
				return;
			}
			// 获取购物车商品列表
			this.$http
			.get("api/goods/getshopcarlist/" + idArr.join(','))
			.then(result => {
				if(result.body.status === 0){
					this.goodslist = result.body.mesages;
				}
			});
			
		},
		remove(id,index){
			// 删除,把商品从 store 中根据传递的 id 删除,同时把当前组件中的 goodslist中,
			// 对应要删除的那个商品,使用 index 来删除
			this.goodslist.splice(index,1);
			this.$store.commit("removeFormCar",id)
		},
		selectedchange(id,val){
			// 每当点击开关,把最新的开关状态
			this.$store.commit("updatedGoodsSelected",{id,selected:val})
		}
	},
	components : {
		numbox
	}
};
</script>

<style lang="scss" scoped>
	.shopcar-container{
		background-color: #eee;
		overflow: hidden;
		.goos-list{
			.mui-card-content-inner{
				display: flex;
				align-items: center; 
			}
			img{
				width: 60px;
				height: 60px;
			}
			h1{
				font-size: 13px;
			}
			.info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.price{
					color:red;
					font-weight: bold;
					}
			}
		}
		.jiesuan{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red{
				color:red;
				font-weight: bold;
				font-size: 16px;
			}
		}
	}
</style>