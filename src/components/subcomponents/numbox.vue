<template>
    <div class="mui-numbox" data-numbox-min='1' >
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" 
                    @change="countChange" ref="numbox" />
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
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props: ["max"],
    watch:{
        // 属性监听
        max: function(newVal,oldVal){
            // 使用文档提供的 js api 来设置最大值 
            mui(".mui-numbox").numbox().setOption('max',newVal);
        }
    }
}    

</script>
 
<style lang="scss" scoped>

</style>

