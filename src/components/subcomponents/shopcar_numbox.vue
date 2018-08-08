<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
                    @change="countChange" ref="numbox" readonly/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
</template>

<script> 
import mui from '../../lib/mui/js/mui.min.js'
export default{
    mounted() {
        // 初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods:{
        countChange(){
            // 每当数量框内容发生改变时,触发
            this.$store.commit("updatedGoodsInfo",{
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ["initcount","goodsid"]
}    

</script>
 
<style lang="scss" scoped>

</style>

