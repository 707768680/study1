<template>
    <div class="newsinfo-container">
        <!-- 大标题  -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{ newsinfo.add_time | dataFormat }}</span>
            <span>点击: {{ newsinfo.click }}次</span>
        </p>

        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件区域 -->
        <comment-box :id=this.id></comment-box>
    </div>
</template>

<script>
    // 导入评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        data (){
            return {
               // 将 URL 地址中传递过来的 ID 值,挂载到 data上,方便以后调用   
               id: this.$route.params.id ,
               newsinfo: []
            }
        },
        created() {
            getNewInfo();
        },
        methods:{
            getNewInfo(){
                this.$http.get('api/getnew/'+ this.id).then(resule => {
                    if(result.body.status === 0){
                        this.newsinfo = result.body.message[0]
                    }else{
                        Toast("或取新闻失败")
                    }
                });
            }
        },
        components: {
            'comment-box':comment
        }

    }
</script>

<style lang="scss" scoped>
    .newsinfo-container{
        padding:0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color:blue;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                // 这里图片显示不全 可以把 scoped 去掉 使用这种写法也不会造成全局污染,因为都写在一个样式下
                width: 100%;
            }
        }
    }
</style>

