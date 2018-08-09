<template>

    <div class="goodsinfo">
			<transition
			@before-enter="beforeEnter"
			@enter="enter"
			@after-Enter="afterEnter">

				<div class="ball" v-show="ballFlag" ref="ball"></div>
			</transition>
		
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>
			 <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->

        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价:<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价;<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
						</p>
						<p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>	</p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addShopCar">加入购物车</mt-button>
							<!-- 在点击加入购物车时,拿到选择的数量 -->
							<!-- 按钮处于 goodsinfo 页面 , 数组属于 numberbox 组件 -->
							<!-- 涉及父子组件,无法直接获取数量 -->
							<!-- 使用子组件向父组件传值 , 父向子传递方法,子调用这个方法,
							同时把数据当做参数传递给这个方法-->
						</p>
					</div>
				</div>
			</div>



        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{ goodsinfo.goods_on }}</p>
						<p>库存情况:{{ goodsinfo.stock_quantity }} 件</p>
						<p>上架时间:{{ goodsinfo.add_time | dataFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
				</div>
			</div>
    </div>    
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/numbox.vue";
export default {
  data() {
    return {
      id: this.$router.params.id,
      lunbotu: [], // 轮播图数据
      goodsinfo: {}, // 获取到的商品信息
			ballFlag: false ,// 控制小球隐藏和显示的标志
			selectedCount: 1  // 选中商品的数量,默认一个
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组中的每一项, 为 item 添加 img 属性, 方便轮播图组件 item.img
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        } else {
        }
      });
    },
    getGoodsInfo() {
      // 获取商品信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    getDesc(id) {
      // 点击使用编程式导航,进入图文介绍
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    getComment(id) {
      // 点击进入评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      // 拼接出一个存储到 store 中的 car 中的商品信息数组 
      // {id: 商品id, count: 要购买的数量, price: 商品的单价, selected: 是否选中该商品}
      var goodsinfo = { 
        id: this.id, 
        count: this.selectedCount, 
        price: this.goodsinfo.sell_price, 
        selected: true
        }
      this.$store.commit('addToCar',goodsinfo);
		},
		beforeEnter(el) {
			el.style.transform ="translate(0,0)"
		},
		enter(el,done){
			el.offsetWidth;  //这句话没有实际的作用，但是，如果不写，出不来动画的效果；可以认为el.offsetWidth会强制动画刷新
			// 小球动画优化 : 终点坐标不应该写死,因为滚动后，Y坐标会发生改变,分辨率也会影响
			// 通过求出 目标位置横纵坐标 与 初始位置横纵坐标的差 , 来算出位移距离
			// domObject.getBoundingClientRect()  来获取
			// 获取小球的位置
			const ballPosition = this.$refs.ball.getBoundingClientRect();
			// 获取 终点 在页面中的位置
			const badgePosition = document.getElementById('badge').getBoundingClientRect();

			const xDist = badgePosition.left - ballPosition.left;
			const yDist = badgePosition.top - ballPosition.top;
			el.style.transform = `translate(${xDist}px,${yDist}px)`;
			el.style.transition = "all 1s ease";
			done();
		},
		afterEnter(el){
			this.ballFlag = !ballFlag;
		},
		getSelectedCount(count){
			// 当子组件把选中的数量传递给父组件的时,把选中的值保存到 data 中
			this.selectedCount = count;
		}
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo {
  background-color: #ccc;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }

}
</style>





